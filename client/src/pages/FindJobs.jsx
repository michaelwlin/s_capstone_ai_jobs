const FindJobs = () => {
  return (
    <div className="container min-h-screen mx-auto p-4">
      <h1 className="mt-12 text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple-700 leading-none mb-8">
        Find Jobs
      </h1>
      <div className="text-lg font-normal text-gray-700 dark:text-gray-300">
        <p className="mb-6">
          Welcome to our job search platform! You can find jobs using one of the
          following methods:
        </p>
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Option 1: General Job Search
          </h2>
          <p className="text-lg md:text-xl mb-4">
            Use our general search engine to find jobs by entering your desired
            position and location.
          </p>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Option 2: Resume-Based Job Matching
          </h2>
          <p className="text-lg md:text-xl mb-4">
            For a more tailored job search experience, sign in and upload your
            resume. Our system will analyze your resume skills and match them
            with job listings to provide you with personalized job
            recommendations.
          </p>
          <p className="text-lg md:text-xl mb-4">
            By uploading your resume, you'll unlock access to job opportunities
            that closely match your qualifications and experience.
          </p>
          <p className="text-lg md:text-xl">
            Take advantage of this feature to streamline your job search process
            and find the perfect job for you.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FindJobs
