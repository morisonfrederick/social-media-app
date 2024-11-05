const Input = ({ ...props }) => {
  return (
    <div>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.fun}
      />
    </div>
  );
};

export default Input;
