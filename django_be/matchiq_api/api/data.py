from openai import OpenAI
import json
import os
from PyPDF2 import PdfReader
import docx2txt
import time
import io

# Collection of text, predetermined stopwords (corpus)
from nltk.corpus import stopwords
# Series of tokens (tokenizer)
from nltk.tokenize import word_tokenize, sent_tokenize

from dotenv import load_dotenv
load_dotenv()


class DataTools:
    def __init__(self):
        pass

    def summarize_text(self, text):
        stop_words = set(stopwords.words("english"))
        words = word_tokenize(text)
        frequency_table = {}

        # Calculate the word frequencies if they are not stop words
        for word in words:
            lower_word = word.lower()
            if lower_word in stop_words:
                continue
            if lower_word in frequency_table:
                frequency_table[lower_word] += 1
            else:
                frequency_table[lower_word] = 1

        sentences = sent_tokenize(text)
        sentence_value = {}

        for sentence in sentences:
            lower_sentence = sentence.lower()
            for word, freq in frequency_table.items():
                if word in lower_sentence:
                    if sentence in sentence_value:
                        sentence_value[sentence] += freq
                    else:
                        sentence_value[sentence] = freq

        sum_values = 0
        for sentence in sentence_value:
            sum_values += sentence_value[sentence]

        average = int(sum_values / len(sentence_value))
        summary = ""
        for sentence in sentences:
            if (sentence in sentence_value) and (
                sentence_value[sentence] > (1.2 * average)
            ):
                summary += " {}".format(sentence)

        return summary

    def analyze_job_desc(self, job_desc_summary):
        system_prompt = "You are a job headhunter looking for specific individuals to fit the job position"
        user_prompt = "Identify the skills (only named skills and not general) in a list and other important info needed for this job:\n {}".format(
            job_desc_summary
        )
        schema = {
            "type": "object",
            "properties": {
                "skills": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "other_information": {
                    "type": "array",
                    "description": "Other important information about the job",
                    "items": {"type": "string"},
                },
            },
        }
        gpt_res = self.gpt(system_prompt, user_prompt, schema)
        res_json = json.loads(gpt_res)
        return res_json

    def get_resume_text(self, file_object):
        content = file_object.read()
        extension = os.path.splitext(file_object.name)[-1]

        text = ""

        if extension == ".pdf":
            # convert pdf to text
            reader = PdfReader(io.BytesIO(content))
            for i in range((len(reader.pages))):
                page = reader.pages[i]
                text += page.extract_text()
        elif extension == ".docx":
            # convert docx to text
            parsable_file = io.BytesIO(content)
            text = docx2txt.process(parsable_file)
        else:
            # allocate other cases
            pass

        return text

    def parse_resume(self, resume_text):
        system_prompt = "You are a resume analyzer trying to categorize the information on a resume."
        user_prompt = f"Categorize the information in this resume:\n {resume_text}"
        schema = {
            "type": "object",
            "properties": {
                "header": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "title": {"type": "string"},
                        "email": {"type": "string", "format": "email"},
                        "phone_number": {"type": "string"},
                        "linkedin_url": {"type": "string", "format": "uri"},
                    },
                },
                "summary": {"type": "array", "items": {"type": "string"}},
                "skills": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "experience": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "position": {"type": "string"},
                            "dates": {"type": "string"},
                            "location": {"type": "string"},
                            "company_description": {"type": "string"},
                            "description": {"type": "array", "items": {"type": "string"}},
                        }}
                },
                "selected_projects": {
                    "type": "array",
                    "items": {"type": "object", "properties": {
                        "name": {"type": "string"},
                        "dates": {"type": "string"},
                        "description": {"type": "array", "items": {"type": "string"}},
                    }}
                },
                "education": {
                    "type": "array",
                    "items": {"type": "object",
                              "properties": {
                                  "degree": {"type": "string"},
                                  "school_university": {"type": "string"},
                                  "dates": {"type": "string"},
                                  "location": {"type": "string"},
                              }}
                },
                "other_information": {
                    "type": "array",
                    "description": "Other things listed in the resume",
                    "items": {
                        "type": "object",
                        "properties": {
                            "header": {"type": "string"},
                            "description": {
                                "type": "array",
                                "items": {"type": "string"},
                            },
                        },
                    },
                },
            },
        }
        gpt_res = self.gpt(system_prompt, user_prompt, schema)
        print("GPT Response:", gpt_res)
        res_json = json.loads(gpt_res)
        return res_json

    def analyze_resume(self, resume):
        system_prompt = "You are a job headhunter trying to summarize a resume."
        user_prompt = "Identify the skills (only named skills and not general) in a list and other important info in this resume:\n {}".format(
            resume
        )
        schema = {
            "type": "object",
            "properties": {
                "skills": {
                    "type": "array",
                    "items": {"type": "string"}
                },
                "experience": {
                    "type": "array",
                    "description": "Experience, education, etc.",
                    "items": {"type": "string"}
                },
                "other_information": {
                    "type": "array",
                    "description": "Other important information about the resume",
                    "items": {"type": "string"},
                },
            },
        }
        gpt_res = self.gpt(system_prompt, user_prompt, schema)
        res_json = json.loads(gpt_res)
        return res_json

    def get_score(self, resume_obj, job_obj):
        system_prompt = "You are a job headhunter trying match people to specific jobs."
        user_prompt = "Take in consideration the following resume and job posting. Keep in mind the experience, skills and education of the applicant. If they do not meet any qualifications, give them a 0 out of 100. Return a matching score 0 out of 100 for this candidate's resume compared to the following job posting: \n {}\n\n Job Posting:\n {}\n\n return the score and reasoning in a JSON format. Be brutal with the score. If they do not have any qualifications of the job, do not give them a good score.".format(
            resume_obj, job_obj
        )
        schema = {
            "type": "object",
            "properties": {
                "score": {
                    "type": "string",
                    "description": "A matching score out of 0 out of 100 that compares the applicant's qualifications to the job."

                },
                "reasoning": {
                    "type": "string",
                    "description": "Provide reasoning for the matching score out of 100.",
                },
            },
        }
        gpt_res = self.gpt(system_prompt, user_prompt, schema)
        res_json = json.loads(gpt_res)
        return res_json

    # Params: job (obj)
    # example_job = {
    #     "title" : "Software Engineer",
    #     "company" : "Netflix",
    #     "description" : job_desc
    # }
    # resume_path = "path_to_resume_in_db.pdf"
    def matching_score(self, job, resume_path):
        resume_text = self.get_resume_text(resume_path)

        # analyze both with gpt
        # both are objects, so convert to string
        print("Analyzing job...")
        obj_job_desc = self.analyze_job_desc(job['description'])
        obj_job_desc = json.dumps(obj_job_desc)

        # sleep to avoid spamming openai
        time.sleep(3)
        print("Analyzing resume...")
        obj_resume = self.analyze_resume(resume_text)
        obj_resume = json.dumps(obj_resume)

        time.sleep(3)
        # get score with gpt
        print("Getting matching score...")
        matching_score = self.get_score(obj_resume, obj_job_desc)

        return (matching_score)

    # GPT Client, takes in system, user prompt and schema32                                                                     5t

    def gpt(self, system_prompt, user_prompt, schema):
        client = OpenAI()
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo-0613",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],
            functions=[{"name": "test", "parameters": schema}],
            function_call={"name": "test"},
        )

        return (completion.choices[0].message.function_call.arguments)
