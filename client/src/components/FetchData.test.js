import { fireEvent, render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { jest } from '@jest/globals'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import FetchData from './FetchData'

jest.mock('axios')
const mockAlert = jest.fn()

beforeAll(() => {
    window.axios = axios
    window.alert = mockAlert
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('FetchData', () => {
    const renderComponent = async () => { // Function to render the component
        await act(async () => {
            render(
                <MemoryRouter>
                    <FetchData />
                </MemoryRouter>
            );
        });
    }
    
    // Mocked jobs test data
    const jobs = { 
        "jobs": [
            { 
                _id: "1",
                title: "Software Engineer",
                company: "Company A",
                url: "test url",
                description: "test description",
                qualifications: "",
                seniority_level: "Entry level",
                employment_type: "Full-time",
                job_function: "Engineering",
                industries: "Software Development",
                information: [
                    "Degree in Computer Science or related field",
                    "2024 full-time start date",
                    "Experience with Go or Python is a plus",
                    "Software engineering intern experience",
                    "Comfortable coding in one or more languages",
                    "Value code simplicity and performance",
                    "Self-starter who enjoys solving difficult problems"
                ],
                skills: [
                    "Computer Science",
                    "Software Engineering",
                    "Go",
                    "Python"
                ],
                location: "New York, NY"
            },
            { _id: "2", 
                title: "Software Engineer - Backend",
                company: "Company B",
                url: "test url",
                description: "test description",
                qualifications: "",
                seniority_level: "Entry level",
                employment_type: "Internship",
                job_function: "Engineering",
                industries: "Software Development",
                information: [
                    "High-impact role",
                    "TV app development",
                    "Collaboration with cross-functional teams",
                    "Annual salary compensation",
                    "Comprehensive benefits",
                    "Diversity and inclusion focus"
                ],
                skills: [
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Redux",
                    "A/B testing",
                    "UI design",
                    "Product management"
                ],
                location: "New York, NY"
            },
            { _id: "3", 
                title: "Software Engineer",
                company: "Company C",
                url: "test url",
                description: "test description",
                qualifications: "",
                seniority_level: "Director",
                employment_type: "Full-time",
                job_function: "Engineering",
                industries: "Software Development",
                information: [
                    "Lead a team of software engineers",
                    "Manage project timelines",
                    "Collaborate with product managers",
                    "Experience with Jira and GIT",
                    "Experience with UI design",
                    "Experience with product management"
                ],
                skills: [
                    "JavaScript",
                    "Python",
                    "Project Management",
                    "Jira",
                    "GIT",
                    "UI design",
                    "Product management"
                ],
                location: "New York, NY"
            },
            { _id: "4", 
                title: "Software Engineer II",
                company: "Company D",
                url: "test url",
                description: "test description",
                qualifications: "",
                seniority_level: "Entry level",
                employment_type: "Full-time",
                job_function: "Engineering",
                industries: "Software Development",
                information: [
                    "Comprehensive benefits",
                    "Diversity and inclusion focus",
                    "Master's degree in Computer Science",
                ],
                skills: [
                    "Computer Science",
                    "Software Engineering",
                    "HTML",
                    "Python",
                    "Ruby",
                    "Node.js",
                    "Django",
                ],
                location: "New York, NY"
            },
            { _id: "5", 
                title: "Senior Software Engineer",
                company: "Company E",
                url: "test url",
                description: "test description",
                qualifications: "",
                seniority_level: "Mid-Senior-Level",
                employment_type: "Full-time",
                job_function: "Engineering",
                industries: "Software Development",
                information: [
                    "5+ years of experience",
                    "Experience with Ruby on Rails",
                    "Experience with React",
                    "Experience with Node.js",
                    "Experience with Python",
                    "Product management experience",
                ],
                skills: [
                    "Computer Science",
                    "Problem Solving",
                    "Software Engineering",
                    "HTML",
                    "Python",
                    "Ruby",
                    "Node.js",
                    "Django",
                ],
                location: "New York, NY"
            },
        ]
    }
    
    // Test fetch data component renders
    test('renders FetchData component', async () => {
        console.error = jest.fn();
        await renderComponent();
    })
    
    // Handles error for fetchdata
    test('handles error for fetchdata', async () => {
        axios.get.mockRejectedValueOnce(new Error());       // Mock axios get request to return an error
        console.error = jest.fn();                          // Mock console.error to prevent error from being displayed
        await renderComponent();                
        expect(console.error).toHaveBeenCalledTimes(1); 
    })

    // Test should render job listings
    test('test should render job listings', async () => {
        axios.get.mockResolvedValueOnce({ data: jobs }) // Mock axios get request to return jobs data
        await renderComponent(); // Render the component
        expect(screen.getByTestId('job-listings')).toBeInTheDocument(); // Check if job listings are rendered
    })
    
    // Test should render job details when job listing clicked

    // Describe filters
    // Test should have employment type dropdown
    // Test should have seniority level dropdown
    // Test should have skills dropdown
    // Test should filter jobs based on selected filters
    // Test should trigger filter application when apply button clicked
    // Test should show alert when no jobs match filters
})


