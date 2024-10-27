import {FC} from "react";
import './ContractCard.css'
import {Link} from "react-router-dom";
import image from "../assets/defaultImage.png"

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
                    <button className="card-button primary" type="submit">Оформить</button>
                </form>
                <Link to={`/contracts/${id}`}>
                    <a className="card-button secondary">Подробнее ›</a>
                </Link>
            </div>
        </div>
        {imagePosition === 'right' && <img src={imageUrl ?? image} className="image"/>}
    </div>
)

export default ContractCard