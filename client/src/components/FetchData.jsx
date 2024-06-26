import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProgressBar from './LoadingBar'
import { useLocation } from 'react-router-dom'
import Select from 'react-select'
import config from '../clientConfig'
import useAuth from '../hooks/useAuth'

function FetchData() {
    const { auth } = useAuth()
    const [jobs, setJobs] = useState([])
    const [filteredJobs, setFilteredJobs] = useState([]) // New state for filtered jobs
    const [userSkills, setUserSkills] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [filterError, setFilterError] = useState('')

    const location = useLocation()
    const {
        keyword,
        location: locationName,
        useSkills,
        userId,
    } = location.state || {}

    // New state variables for filters
    const [employmentTypeFilter, setEmploymentTypeFilter] = useState('')
    const [seniorityLevelFilter, setSeniorityLevelFilter] = useState('')
    const [skillsFilter, setSkillsFilter] = useState([])

    // Function to filter jobs based on the selected filters
    const applyFilters = () => {
        const filtered = jobs.filter((job) => {
            return (
                (!employmentTypeFilter ||
                    job.employment_type === employmentTypeFilter) &&
                (!seniorityLevelFilter ||
                    job.seniority_level === seniorityLevelFilter) &&
                (!skillsFilter.length ||
                    job.skills.some((skill) => skillsFilter.includes(skill)))
            )
        })
        setFilteredJobs(filtered)

        // If no jobs match the filters
        if (filtered.length === 0) {
            setFilterError('No jobs match the selected filters.')
        } else {
            setFilterError('')
        }
    }

    // Fetch jobs when the component mounts or search parameters change
    useEffect(() => {
        const getJobs = async () => {
            setIsLoading(true)
            try {
                const url = `${config.API_URL}/jobs?keyword=${keyword}&location=${locationName}&useSkills=${useSkills}&userId=${auth.userId}`
                const response = await axios.get(url, {
                    credentials: 'include', // Necessary to include cookies
                })
                setJobs(response.data.jobs || [])
                if (useSkills) {
                    setUserSkills(response.data.userSkills || [])
                }
                setIsLoading(false)
            } catch (error) {
                console.error('Failed to fetch jobs:', error)
                setIsLoading(false)
            }
        }
        getJobs()
    }, [keyword, locationName, useSkills, auth.userId])

    const [selectedJob, setSelectedJob] = useState(null)

    return (
        <div>
            {isLoading && <ProgressBar />}
            <div className="flex items-center space-x-4 py-4">
                <Select
                    options={[
                        { value: 'Full-time', label: 'Full-time' },
                        { value: 'Part-time', label: 'Part-time' },
                        { value: 'Contract', label: 'Contract' },
                        { value: 'Internship', label: 'Internship' },
                        { value: 'Temporary', label: 'Temporary' },
                        { value: 'Remote', label: 'Remote' },
                    ]}
                    isSearchable={false}
                    isClearable={true}
                    onChange={(selectedOption) =>
                        setEmploymentTypeFilter(
                            selectedOption ? selectedOption.value : null,
                        )
                    }
                    placeholder="Employment Type"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            borderRadius: '9999px',
                        }),
                    }}
                />
                <Select
                    options={[
                        { value: 'Entry level', label: 'Entry Level' },
                        { value: 'Associate', label: 'Associate' },
                        { value: 'Mid-Senior-Level', label: 'Mid-Senior Level' },
                        { value: 'Director', label: 'Director' },
                        { value: 'Executive', label: 'Executive' },
                    ]}
                    isSearchable={false}
                    isClearable={true}
                    onChange={(selectedOption) =>
                        setSeniorityLevelFilter(
                            selectedOption ? selectedOption.value : null,
                        )
                    }
                    placeholder="Seniority Level"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            borderRadius: '9999px',
                        }),
                    }}
                />
                <Select
                    options={[
                        { value: 'Java', label: 'Java' },
                        { value: 'C#', label: 'C#' },
                        { value: 'C++', label: 'C++' },
                        { value: 'Python', label: 'Python' },
                        { value: 'Javascript', label: 'JavaScript' },
                        { value: 'Typescript', label: 'Typescript' },
                        { value: 'HTML', label: 'HTML' },
                        { value: 'CSS', label: 'CSS' },
                        { value: 'SQL', label: 'SQL' },
                        { value: 'MongoDB', label: 'MongoDB' },
                        { value: 'React', label: 'React' },
                        { value: 'Angular', label: 'Angular' },
                        { value: 'Express', label: 'Express' },
                        { value: 'Django', label: 'Django' },
                        { value: 'Vue', label: 'Vue' },
                        { value: 'Node', label: 'Node' },
                    ]}
                    isMulti
                    isSearchable={false}
                    isClearable={true}
                    onChange={(selectedOptions) =>
                        setSkillsFilter(
                            selectedOptions
                                ? selectedOptions.map((option) => option.value)
                                : [],
                        )
                    }
                    placeholder="Skills"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            borderRadius: '9999px',
                        }),
                    }}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-2 px-4 font-bold rounded-full"
                    onClick={() => {
                        applyFilters()
                    }}
                >
                    Apply Filters
                </button>
            </div>
            <div>{filterError && <p>{filterError}</p>}</div>
            {useSkills && <p className="mb-4">Matching jobs with your skills...</p>}
            <div className="flex">
                <div
                    data-testid="job-listings"
                    className="h-screen overflow-y-auto w-1/2"
                >
                    {(filterError
                        ? []
                        : filteredJobs.length > 0
                            ? filteredJobs
                            : jobs
                    ).map((job, index) => (
                        <div
                            key={index}
                            className="p-5 cursor-pointer hover:bg-gray-200 border-b border-gray-200"
                            onClick={() => setSelectedJob(job)}
                        >
                            <p className="text-xl font-bold text-blue-500">{job.title}</p>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <p style={{ fontWeight: 'normal', margin: 0 }}>{job.company}</p>
                                <span style={{ fontStyle: 'italic' }}>{job.location}</span>
                            </div>
                            {useSkills && (
                                <p className="text-md">
                                    <strong>Matching Skills:</strong> <i>{job.matchScore}</i>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
                {selectedJob && (
                    <div
                        data-testid="job-details"
                        className="overflow-y-auto h-screen w-2/3 p-5 bg-gray-100"
                        style={{ maxHeight: '100%' }}
                    >
                        <p className="text-xl mb-2 font-bold text-blue-500">
                            {selectedJob.title}
                        </p>
                        <p style={{ fontWeight: 'normal' }}>{selectedJob.company}</p>
                        <span
                            style={{
                                fontStyle: 'italic',
                                display: 'block',
                                marginBottom: '1rem',
                            }}
                        >
                            {selectedJob.location}
                        </span>
                        <p
                            data-testid="job-emp"
                            style={{ display: 'block', marginBottom: '1rem' }}
                        >
                            <strong>Employment Type:</strong> {selectedJob.employment_type}
                        </p>
                        <p
                            data-testid="job-seniority"
                            style={{ display: 'block', marginBottom: '1rem' }}
                        >
                            <strong>Seniority Level:</strong> {selectedJob.seniority_level}
                        </p>
                        <p data-testid="job-desc">
                            <strong>Description:</strong>
                        </p>
                        <p style={{ whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
                            {selectedJob.description}
                        </p>
                        <p>
                            <strong>Skills:</strong>{' '}
                            {selectedJob.skills ? selectedJob.skills.join(', ') : 'N/A'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FetchData
