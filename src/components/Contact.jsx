import useContact from "../hooks/useContact";

const ContactList = () => {
  return (
    <li>
      <span className="inline-block w-48 bg-gray-300 justify-center items-center"></span>
    </li>
  );
};

const Contact = () => {
  const { contact } = useContact();
  console.log(contact);

  return (
    <ul>
      <li>
        <a href="tel:{contact[0]?.phoneNumber}">
          Phone: {contact[0]?.phoneNumber}
        </a>
      </li>
      <li>
        <a href="mailto:{contact[0]?.email}">Email: {contact[0]?.email}</a>
      </li>
    </ul>
  );
};
export default Contact;
