const dev = {
    API_URL: 'http://localhost:4000/api',
    AUTH_URL: 'http://localhost:4500/api/auth',
    DJANGO_URL: 'http://localhost:8000/api'

};

const prod = {
    API_URL: 'https://matchiq-api-8d1eb08929d0.herokuapp.com/api',
    AUTH_URL: 'https://matchiq-api-8d1eb08929d0.herokuapp.com/api/auth',
    DJANGO_URL: 'https://matchiq-django-48494c1c8d6c.herokuapp.com/api'
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;
// const config = prod;

export default config;