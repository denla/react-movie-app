const Chips = ({ type, types }) => {
  return (
    <div className="chips chips-sort">
      <a href={`/`} key={0}>
        <div className={`chip ${!type ? `active` : ``}`}>All</div>
      </a>

      {types.map((el, i) => (
        <a href={`?type=${i + 1}`} key={i + 1}>
          <div className={`chip ${i + 1 == type ? `active` : ``}`}>{el}</div>
        </a>
      ))}
    </div>
  );
};

export default Chips;
