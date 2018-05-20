import {h} from 'preact';

const Card = ({iconPath, col1, col2}) => (
    <article className="card">
        <img className="card__icon" src={iconPath} />
        <p>{col1}</p>
        <p>{col2}</p>
    </article>
);

export default Card;