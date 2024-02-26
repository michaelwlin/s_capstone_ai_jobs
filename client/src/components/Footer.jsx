import { Footer, Card } from 'flowbite-react'
import { FaFacebook, FaInstagram, FaTwitter, FaGithubAlt } from 'react-icons/fa'

const SiteFooter = () => {
  return (
    <Footer bgDark container className="footer">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              src="/icons/Mlogo.png"
              alt="MatchIQ Logo"
              name="MatchIQ"
            />
          </div>
          <div className="grid grid-cols-4 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <Card className="max-w-sm bg-dark statistics">
              <h5 className="text-xl text-center font-bold tracking-tight text-white">
                JOBS
              </h5>
              <p className="text-3xl text-center font-normal text-white">
                + 10k
              </p>
            </Card>
            <Card className="max-w-sm bg-dark statistics">
              <h5 className="text-xl text-center font-bold tracking-tight text-white">
                STARTUPS
              </h5>
              <p className="text-3xl text-center font-normal text-white">
                + 20k
              </p>
            </Card>
            <Card className="max-w-sm bg-dark statistics">
              <h5 className="text-xl text-center font-bold tracking-tight text-white">
                TALENT
              </h5>
              <p className="text-3xl text-center font-normal text-white">
                + 10k
              </p>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">MatchIQ</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="MatchIQ™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={FaFacebook} />
            <Footer.Icon href="#" icon={FaInstagram} />
            <Footer.Icon href="#" icon={FaTwitter} />
            <Footer.Icon href="#" icon={FaGithubAlt} />
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default SiteFooter
