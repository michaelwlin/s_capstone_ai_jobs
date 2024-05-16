const HowItWorks = () => {
  return (
    <div className="container mx-auto min-h-screen font-sans p-4">
      <h1 className="mt-12 text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple-700 leading-none mb-8">
        How It Works
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step 1 */}
        <div className="flex items-center justify-center drop-shadow-lg">
          <img
            src="/icons/register.gif"
            alt="Step 1"
            className="max-w-full h-auto"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-700">
            Step 1: Sign Up
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Sign up for our service by providing your email and creating a
            password.
          </p>
        </div>

        {/* Step 2 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-700">
            Step 2: Upload Resume
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Upload your resume or fill out your profile manually to provide
            information about your skills and experience.
          </p>
        </div>
        <div className="flex items-center justify-center drop-shadow-lg">
          <img
            src="/icons/uploadres.gif"
            alt="Step 2"
            className="max-w-full h-auto"
          />
        </div>

        {/* Step 3 */}
        <div className="flex items-center justify-center drop-shadow-lg">
          <img
            src="/icons/suggest.gif"
            alt="Step 3"
            className="max-w-full h-auto"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-700">
            Step 3: Get Resume Suggestions
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Receive suggestions to enhance your resume based on industry
            standards and job market trends.
          </p>
        </div>

        {/* Step 4 */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-700">
            Step 4: Search Jobs
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Explore job listings tailored to your skills, experience, and
            preferences.
          </p>
        </div>
        <div className="flex items-center justify-center drop-shadow-lg">
          <img
            src="/icons/search.gif"
            alt="Step 4"
            className="max-w-full h-auto"
          />
        </div>

        {/* Step 5 */}
        <div className="flex items-center justify-center drop-shadow-lg">
          <img
            src="/icons/score.gif"
            alt="Step 5"
            className="max-w-full h-auto"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-700">
            Step 5: Get Skills Match Score
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Receive a skills match score indicating how well your skills match
            the requirements of job listings.
          </p>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
