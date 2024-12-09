import {Link} from "react-router-dom";
import {HandlerGetAccountsListAccount} from "../api/Api.ts";
import {FC} from "react";
import {accountStatuses} from "../api/constants.ts";
import {useIsModerator} from "../slices/user.ts";
import "./AccountCard.css"

interface Props extends HandlerGetAccountsListAccount {
    onChangeStatus: (id: number, status: string) => void
}

const AccountCard: FC<Props> = ({
                                    id,
                                    number,
                                    creator,
                                    status,
                                    createdAt,
                                    requestedAt,
                                    totalFee,
                                    onChangeStatus,
                                }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }
    const isModerator = useIsModerator()

    return (
        <div className="account-card-info">
            <Link className="title" to={`/accounts/${id}`}>
                Cчёт №{number}
            </Link>
            <div className="account description-row">
                <div className="account-item-badge">
                    <p className="digit">{accountStatuses[status!]}</p>
                    <p className="description">статус</p>
                </div>

                <div className="account-item-badge">
                    <p className="digit">{formatDate(createdAt!)}</p>
                    <p className="description">дата создания</p>
                </div>

                <div className="account-item-badge">
                    <p className="digit">{formatDate(requestedAt!)}</p>
                    <p className="description">дата подачи</p>
                </div>

                {totalFee && <div className="account-item-badge">
                    <p className="digit">{totalFee} ₽</p>
                    <p className="description">ежемесячный платеж</p>
                </div>}

                {isModerator && <div className="account-item-badge">
                    <p className="digit">{creator}</p>
                    <p className="description">создатель</p>
                </div>}
            </div>
            <div className="buttons-row">
                <Link to={`/accounts/${id}`} className="card-button secondary">
                    Открыть
                </Link>
                {(isModerator && status === 'applied') &&
                    <>
                        <td>
                            <Link to="#" onClick={() => onChangeStatus(id!, 'rejected')}>Отклонить</Link>
                        </td>
                        <td>
                            <Link to="#" onClick={() => onChangeStatus(id!, 'finalized')}>Выполнить</Link>
                        </td>
                    </>}
            </div>
        </div>
    );
};

export default AccountCard;