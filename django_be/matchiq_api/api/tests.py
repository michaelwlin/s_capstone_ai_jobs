from django.test import TestCase
import json
class TestAPI(TestCase):
    def test_default_status_code(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)


    def test_default_response(self):
        response = self.client.get('/api/')
        data = json.loads(response.content)
        self.assertEqual(data['greeting'], 'Hello, world!')


    def test_scrape_success(self):
        response = self.client.get('/api/scrape', {'keywords': 'Sales Development Representative', 'location': 'San Francisco', 'limit': 1})
        self.assertEqual(response.status_code, 200)


    def test_scrape_missing_parameters(self):
        response = self.client.get('/api/scrape')
        self.assertEqual(response.status_code, 400)


    def test_scrape_description_success(self):
        valid_url = "https://www.linkedin.com/jobs/view/sales-development-representative-west-at-planful-3775330364?position=59&pageNum=0&refId=IPrg5FnSrv5pevvzBBKiVA%3D%3D&trackingId=M5b%2FYektTA7IptUzYaLnYA%3D%3D&trk=public_jobs_jserp-result_search-card"
        response = self.client.get('/api/scrape_desc', {'url': valid_url})
        self.assertEqual(response.status_code, 200)


    def test_scrape_description_missing_url_parameter(self):
        response = self.client.get('/api/scrape_desc')
        self.assertEqual(response.status_code, 400)


    def test_valid_resume_upload(self):
        example_file = "api/Dan_Clark_-_Resume_-_Software_Engineer-2.pdf"
        with open(example_file, 'rb') as file:
            response = self.client.post('/api/upload_resume', {'resume': file, 'userID': '123'})
        self.assertEqual(response.status_code, 200)


    def test_missing_resume_file(self):
        response = self.client.post('/api/upload_resume', {'userID': '123'})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {'error': 'No resume file provided'})


    def test_wordbank_success(self):
        example_file = "api/Dan_Clark_-_Resume_-_Software_Engineer-2.pdf"
        with open(example_file, 'rb') as file:
            response = self.client.post('/api/upload_resume', {'resume': file, 'userID': '123'})
        res_json = json.loads(response.content)
        response = self.client.post('/api/wordbank', json.dumps(res_json), content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_wordbank_missing_body(self):
        response = self.client.post('/api/wordbank', content_type='application/json')
        self.assertEqual(response.status_code, 400)


    def test_proofread_success(self):
        example_file = "api/Dan_Clark_-_Resume_-_Software_Engineer-2.pdf"
        with open(example_file, 'rb') as file:
            response = self.client.post('/api/upload_resume', {'resume': file, 'userID': '123'})
        res_json = json.loads(response.content)
        temp_text = {"resume_text" : str(res_json)}
        response = self.client.post('/api/proofread', json.dumps(temp_text), content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_proofread_missing_body(self):
        response = self.client.post('/api/proofread', content_type='application/json')
        self.assertEqual(response.status_code, 400)


    def test_enhance_success(self):
        example_file = "api/Dan_Clark_-_Resume_-_Software_Engineer-2.pdf"
        with open(example_file, 'rb') as file:
            response = self.client.post('/api/upload_resume', {'resume': file, 'userID': '123'})
        res_json = json.loads(response.content)
        temp_text = {"resume_text" : str(res_json)}
        response = self.client.post('/api/enhance', json.dumps(temp_text), content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_enhance_missing_body(self):
        response = self.client.post('/api/enhance', content_type='application/json')
        self.assertEqual(response.status_code, 400)


    def test_score_success(self):
        example_file = "api/Dan_Clark_-_Resume_-_Software_Engineer-2.pdf"
        with open(example_file, 'rb') as file:
            response_one = self.client.post('/api/upload_resume', {'resume': file, 'userID': '123'})
        resume_json = json.loads(response_one.content)
        valid_url = "https://www.linkedin.com/jobs/view/sales-development-representative-west-at-planful-3775330364?position=59&pageNum=0&refId=IPrg5FnSrv5pevvzBBKiVA%3D%3D&trackingId=M5b%2FYektTA7IptUzYaLnYA%3D%3D&trk=public_jobs_jserp-result_search-card"
        response_two = self.client.get('/api/scrape_desc', {'url': valid_url})
        job_json = json.loads(response_two.content)
        temp_text = {"resume_text" : str(resume_json), "job_description" : str(job_json)}
        response = self.client.post('/api/get_score', json.dumps(temp_text), content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_score_missing_body(self):
        response = self.client.post('/api/get_score', content_type='application/json')
        self.assertEqual(response.status_code, 400)
