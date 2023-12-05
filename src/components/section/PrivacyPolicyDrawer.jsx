import { Drawer } from "antd";

const PrivacyPolicyDrawer = ({ onClose, open }) => {
  return (
    <Drawer
      title="Privacy Policy"
      placement="right"
      onClose={onClose}
      open={open}
      size="large"
    >
      <div className="text-black flex flex-col justify-center gap-3 mb-10">
        <h1 className="font-extrabold">1. Overview</h1>
        <p>
          Welcome to Kasthamandap! This Privacy Policy outlines how we collect,
          use, and protect the personal information you provide when using our
          website to submit reviews.
        </p>

        <h1 className="font-extrabold">2. Information We Collect</h1>
        <span>
          <strong>Email Address:</strong>
          <ul>
            <li>
              Purpose: We collect your email address to identify your reviews
              and to communicate with you if needed.
            </li>
            <li>
              Consent: By submitting a review, you consent to the collection and
              use of your email address for these purposes.
            </li>
          </ul>
        </span>

        <h1 className="font-extrabold">3. How We Use Your Information</h1>
        <span>
          We use your email address to:
          <ul>
            <li>Identify and display your reviews on our website.</li>
            <li>
              Contact you for clarification or additional information related to
              your review.
            </li>
          </ul>
        </span>

        <h1 className="font-extrabold">4. Data Security</h1>
        <p>
          We take the security of your information seriously. Your email address
          is stored securely, and we implement measures to prevent unauthorized
          access, disclosure, or alteration of your data.
        </p>

        <h1 className="font-extrabold">5. Data Retention</h1>
        <p>
          We retain your email address for as long as necessary to fulfill the
          purposes outlined in this Privacy Policy or as required by law. If you
          wish to have your information removed, please contact us.
        </p>

        <h1 className="font-extrabold">6. Third-Party Services</h1>
        <p>
          We do not sell, trade, or otherwise transfer your email address to
          third parties. Your information may be disclosed to trusted third
          parties who assist us in operating our website or conducting our
          business, provided that they agree to keep this information
          confidential.
        </p>

        <h1 className="font-extrabold">7. Your Rights</h1>
        <span>
          You have the right to:
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccuracies in your personal data.</li>
            <li>Request the deletion of your personal data.</li>
            <li>Object to the processing of your personal data.</li>
          </ul>
          To exercise these rights or if you have any questions, please contact
          us at{" "}
          <a
            href="mailto:kasthamandap.fin@gmail.com"
            className="hover:text-blue-400"
          >
            kasthamandap.fin@gmail.com
          </a>
        </span>

        <h1 className="font-extrabold">8. Changes to This Policy</h1>
        <p>
          We may update this Privacy Policy to reflect changes in our practices.
          We encourage you to review this page periodically for the latest
          information on our privacy practices.
        </p>

        <h1 className="font-extrabold">9. Contact Information</h1>
        <p>
          If you have any questions or concerns regarding this Privacy Policy,
          please contact us at{" "}
          <a
            href="mailto:kasthamandap.fin@gmail.com"
            className="hover:text-blue-400"
          >
            kasthamandap.fin@gmail.com
          </a>
        </p>

        <p className="text-center mt-3 italic">This Privacy Policy was last updated on 28/11/2023.</p>
      </div>
    </Drawer>
  );
};

export default PrivacyPolicyDrawer;
