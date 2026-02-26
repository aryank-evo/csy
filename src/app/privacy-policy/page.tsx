import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";

export const metadata = {
  title: "Privacy Policy - CSY Real Estate",
};

const PrivacyPolicyPage = () => {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <main className="pt-170 lg-pt-140 pb-120">
        <div className="container">
         <div className="bg-white border-20 p-40 lg-p-25">
  <h1 className="mb-20">Privacy Policy</h1>
  <p className="mb-30">Last updated: February 26, 2026</p>

  <p className="mb-25">
    CSY Real Estate (“we”, “our”, or “us”) operates a digital property
    discovery platform that enables users to buy, rent, lease, and find
    paying guest (PG) accommodations. This Privacy Policy explains how we
    collect, use, disclose, and safeguard your information when you use our
    website.
  </p>

  <h4 className="mb-15">1. Information We Collect</h4>
  <p className="mb-15">
    We collect information in the following ways:
  </p>
  <ul className="mb-25">
    <li>
      <strong>Information You Provide:</strong> Name, phone number, email
      address, user type (Buyer / Agent / Consultant), property preferences,
      and any details submitted via forms.
    </li>
    <li>
      <strong>Property Listing Data:</strong> Information submitted by owners,
      agents, or consultants when listing properties.
    </li>
    <li>
      <strong>Location Data:</strong> Approximate location information when
      using map-based search features.
    </li>
    <li>
      <strong>Technical Data:</strong> IP address, browser type, device
      information, and usage analytics.
    </li>
  </ul>

  <h4 className="mb-15">2. How We Use Your Information</h4>
  <ul className="mb-25">
    <li>To provide property details after lead submission.</li>
    <li>To connect users with property owners or consultants.</li>
    <li>To improve search results and user experience.</li>
    <li>To manage property approvals and platform moderation.</li>
    <li>To send relevant updates or respond to inquiries.</li>
    <li>To analyze traffic and platform performance.</li>
  </ul>

  <h4 className="mb-15">3. Lead Capture & Access Control</h4>
  <p className="mb-25">
    Certain property details may require submission of contact information
    before full access is granted. This helps us ensure genuine inquiries and
    improve service quality. We may use secure session storage or cookies to
    remember previously submitted leads for a limited duration.
  </p>

  <h4 className="mb-15">4. Cookies & Local Storage</h4>
  <p className="mb-25">
    We use cookies and browser storage to:
  </p>
  <ul className="mb-25">
    <li>Remember user preferences</li>
    <li>Prevent repeated lead form prompts</li>
    <li>Enhance website performance</li>
    <li>Analyze visitor behavior</li>
  </ul>

  <h4 className="mb-15">5. Data Sharing</h4>
  <p className="mb-25">
    We do not sell or rent personal data. Information may be shared only:
  </p>
  <ul className="mb-25">
    <li>With property owners or authorized agents for inquiry purposes</li>
    <li>With trusted service providers (hosting, analytics, cloud storage)</li>
    <li>If required by law or regulatory authorities</li>
  </ul>

  <h4 className="mb-15">6. Google Maps & Third-Party Services</h4>
  <p className="mb-25">
    Our platform integrates Google Maps and related APIs for map display and
    location-based search. Use of these services is subject to Google’s own
    privacy policies and terms.
  </p>

  <h4 className="mb-15">7. Data Security</h4>
  <p className="mb-25">
    We implement appropriate technical and organizational measures to protect
    personal data from unauthorized access, alteration, disclosure, or
    destruction. However, no method of internet transmission is 100% secure.
  </p>

  <h4 className="mb-15">8. Data Retention</h4>
  <p className="mb-25">
    We retain personal information only for as long as necessary to fulfill
    the purposes outlined in this policy or as required by applicable law.
  </p>

  <h4 className="mb-15">9. Your Rights</h4>
  <p className="mb-25">
    You may request access, correction, or deletion of your personal data by
    contacting us through the contact information provided on our website.
  </p>

  <h4 className="mb-15">10. Policy Updates</h4>
  <p className="mb-25">
    We may update this Privacy Policy periodically. Changes become effective
    once posted on this page with a revised “Last updated” date.
  </p>

  <h4 className="mb-15">11. Contact Us</h4>
  <p className="mb-0">
    If you have questions about this Privacy Policy, please contact us through
    the official contact details listed on our website.
  </p>
</div>
        </div>
      </main>
      <FooterOne style={true} />
    </Wrapper>
  );
};

export default PrivacyPolicyPage;
