import {FC} from "react";
import './ContractCard.css'
import {Link} from "react-router-dom";
import image from "../assets/defaultImage.png"
import {Button} from "react-bootstrap";

interface Props {
    id: number
    description: string
    fee: number
    imageUrl?: string
    imagePosition: "left" | "right"
    name: string
}

const ContractCard: FC<Props> = ({id, description, fee, imageUrl, name, imagePosition = "left"}) => (
    <div className="contract-card">
        <img src={imageUrl ?? image} className="image mobile"/>
        {imagePosition === 'left' && <img src={imageUrl ?? image} className="image"/>}
        <div className="description-column">
            <Link to={`/contracts/${id}`}>
                <a className="title">{name}</a>
            </Link>
            <p className="description">{description}</p>
            <div className="contract-badge">
                <p className="digit">{fee} ₽</p>
                <p className="description">плата за обслуживание</p>
            </div>
            <div className="buttons-row">
                <form action="/contracts/{{ $contract.Id }}/add-to-account" method="post">
                    <Button className="card-button primary disabled" type="submit">Оформить</Button>
                </form>
                <Link to={`/contracts/${id}`}>
                    <Button variant="link" className="card-button secondary">Подробнее ›</Button>
                </Link>
            </div>
        </div>
        {imagePosition === 'right' && <img src={imageUrl ?? image} className="image"/>}
    </div>
)

export default ContractCard