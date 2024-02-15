from openai import OpenAI
import json
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

        return(completion.choices[0].message.function_call.arguments)


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
        print(res_json)
