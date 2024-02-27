import Card from "../card/Card";

export default function Cards(props) {
    const { characters, onClose } = props;

    return (
        <div className="card-container">
            {characters.map((character) => (
                <Card
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    status={character.status}
                    species={character.species}
                    gender={character.gender}
                    origin={character.origin.name}
                    image={character.image}
                    onClose={onClose}
                />
            ))}
        </div>
    );
}
