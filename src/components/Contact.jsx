import useContact from "../hooks/useContact";

const Contact = () => {
  const { contact } = useContact();

  return (
    <>
      <span className="block font-light">
        <span className="inline-block w-28">Phone : </span>
        <a
          href={`tel:+${contact[0]?.phoneNumber}`}
          className="hover:text-blue-400"
        >
          +{contact[0]?.phoneNumber}
        </a>
      </span>
      <span className="block">
        <span className="inline-block w-28">Email : </span>
        <a href={`mailto:${contact[0]?.email}`} className="hover:text-blue-400">
          {contact[0]?.email}
        </a>
      </span>
    </>
  );
};

export default Contact;
