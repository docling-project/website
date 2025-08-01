interface TwitterProps {
  size?: string;
}

const Twitter = ({ size = "16" }: TwitterProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.01859 8.70018L0.304072 15.223H2.83554L7.20961 10.217L11.0639 15.224L16 15.1971L9.7417 6.92137L15.0824 0.803734L12.5916 0.775879L8.55741 5.37346L5.10591 0.783386L0 0.777846L6.01859 8.70018ZM13.0105 13.7215L11.7331 13.7175L2.95653 2.22753H4.33063L13.0105 13.7215Z"
        fill="#28251B"
      />
    </svg>
  );
};

export default Twitter;
