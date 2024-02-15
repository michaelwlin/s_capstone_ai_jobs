import unittest
import app


class TestCase(unittest.TestCase):
    def test_app(self):
        expected = "Hello World"
        self.assertEqual(app.test_function(), expected)

