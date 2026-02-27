import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";

export const metadata = {
  title: "Terms and Conditions - CSY Real Estate",
};

const TermsPage = () => {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <main className="pt-170 lg-pt-140 pb-120">
        <div className="container">
          <div className="bg-white border-20 p-40 lg-p-25">
            <h1 className="mb-20">Terms and Conditions</h1>
            <p className="mb-30">Last updated: February 26, 2026</p>

            <p className="mb-25">
              These Terms and Conditions (&quot;Terms&quot;) govern your access
              to and use of the CSY Real Estate website and services. By
              accessing or using this platform, you agree to comply with these
              Terms and all applicable laws and regulations.
            </p>

            <h4 className="mb-15">1. Acceptance of Terms</h4>
            <p className="mb-25">
              By using this website, you acknowledge that you have read,
              understood, and agreed to be bound by these Terms. If you do not
              agree, you must not use this platform.
            </p>

            <h4 className="mb-15">2. Nature of Platform</h4>
            <p className="mb-25">
              CSY Real Estate operates as a property discovery and
              lead-generation platform that connects buyers, tenants, property
              owners, agents, and consultants. We do not directly own, sell,
              lease, or manage properties listed on the platform unless
              explicitly stated.
            </p>

            <h4 className="mb-15">3. User Responsibilities</h4>
            <ul className="mb-25">
              <li>
                Provide accurate and truthful information when submitting forms.
              </li>
              <li>Use the platform only for lawful purposes.</li>
              <li>Not misuse, scrape, copy, or exploit listing data.</li>
              <li>
                Not attempt unauthorized access to admin or restricted areas.
              </li>
            </ul>

            <h4 className="mb-15">4. Property Listings & Accuracy</h4>
            <p className="mb-25">
              Property listings, prices, availability, and specifications are
              provided by owners or authorized representatives. While we strive
              for accuracy, we do not guarantee that listing information is
              complete, current, or error-free. Users are advised to
              independently verify property details before making decisions.
            </p>

            <h4 className="mb-15">5. Lead Submission & Contact</h4>
            <p className="mb-25">
              Certain property details may require submission of contact
              information. By submitting a lead form, you consent to being
              contacted by property owners, agents, or consultants regarding
              your inquiry.
            </p>

            <h4 className="mb-15">6. Listing Approval & Removal</h4>
            <p className="mb-25">
              All property listings are subject to review and approval. We
              reserve the right to edit, reject, suspend, or remove listings
              that violate platform policies or applicable laws without prior
              notice.
            </p>

            <h4 className="mb-15">7. Intellectual Property</h4>
            <p className="mb-25">
              All website content, including design, logos, branding, text,
              graphics, and software, is owned by or licensed to CSY Real Estate
              and protected under applicable intellectual property laws.
              Unauthorized reproduction or distribution is strictly prohibited.
            </p>

            <h4 className="mb-15">8. Third-Party Services</h4>
            <p className="mb-25">
              The platform may integrate third-party services such as Google
              Maps, analytics tools, and hosting providers. Use of such services
              is subject to their respective terms and privacy policies.
            </p>

            <h4 className="mb-15">9. Limitation of Liability</h4>
            <p className="mb-25">
              CSY Real Estate shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from the use of this
              website, including decisions made based on property listings or
              communications with third parties.
            </p>

            <h4 className="mb-15">10. Indemnification</h4>
            <p className="mb-25">
              Users agree to indemnify and hold harmless CSY Real Estate from
              any claims, losses, liabilities, or expenses arising out of misuse
              of the platform or violation of these Terms.
            </p>

            <h4 className="mb-15">11. Termination of Access</h4>
            <p className="mb-25">
              We reserve the right to suspend or terminate access to the
              platform at our discretion if users breach these Terms or engage
              in unlawful activity.
            </p>

            <h4 className="mb-15">12. Changes to Terms</h4>
            <p className="mb-25">
              We may update these Terms periodically. Continued use of the
              platform after changes are posted constitutes acceptance of the
              revised Terms.
            </p>

            <h4 className="mb-15">13. Governing Law</h4>
            <p className="mb-0">
              These Terms shall be governed and interpreted in accordance with
              the applicable laws of India. Any disputes shall be subject to the
              jurisdiction of the competent courts in the applicable region.
            </p>
          </div>
        </div>
      </main>
      <FooterOne style={true} />
    </Wrapper>
  );
};

export default TermsPage;
