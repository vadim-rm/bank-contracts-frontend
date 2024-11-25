import {FC, useEffect, useState} from "react";
import {api} from "../api";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Spinner} from "react-bootstrap";
import {ROUTE_LABELS, ROUTES} from "../Routes.ts";
import {HandlerAccountContractResponse} from "../api/Api.ts";
import "./AccountPage.css"
import Layout from "../components/Layout.tsx";
import image from "../assets/defaultImage.png";
import {useAsyncError} from "../api/useAsyncError.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";

const AccountPage: FC = () => {
    const params = useParams<{ id: string }>()
    const [accountNumber, setAccountNumber] = useState("");
    const [status, setStatus] = useState("");
    const [contracts, setContracts] = useState<HandlerAccountContractResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const throwError = useAsyncError();

    const editable = status === "draft"
    const id = parseInt(params.id!)

    useEffect(() => {
        setLoading(true);
        api.accounts.accountsDetail(id).then((response) => {
            setContracts(response.data.contracts!)
            setAccountNumber(response.data.number!)
            setStatus(response.data.status!)
            setLoading(false)
        })
    }, [params.id])

    const onClear = () => {
        if (submitting) return;
        api.accounts.accountsDelete(id).then(() => {
            navigate(ROUTES.CONTRACTS)
        })
    }

    const onNumberChange = () => {
        if (submitting) return;
        api.accounts.accountsUpdate(id, {
            number: accountNumber,
        }).then(() => {
            setMessage("Номер счета обновлен")
        })
    }

    const onMainChange = (contractId: number) => {
        api.accounts.contractMainUpdate(id, contractId).then(() => {
            api.accounts.accountsDetail(id).then((response) => {
                setContracts(response.data.contracts!)
                setMessage("Изменен основной договор")
            })
        })
    }

    const onSubmit = () => {
        if (submitting) return;
        setSubmitting(true);
        api.accounts.submitUpdate(id).then(() => {
            api.accounts.accountsDetail(id).then((response) => {
                setStatus(response.data.status!)
                setMessage("Заявка на счёт успешно отправлена")
            })
            setSubmitting(false)
        }).catch((r) => {
            throwError(r)
            setSubmitting(false)
        })
    }

    return (
        <Layout>
            <BreadCrumbs crumbs={[
                {
                    label: ROUTE_LABELS.ACCOUNTS,
                    path: ROUTES.ACCOUNTS
                },
                {
                    label: "Заявка на счёт",
                }
            ]}/>
            <div className="cart-column">
                {message && <div className="message">{message}</div>}
                <div>
                    <p className="account-number">Номер счёта:</p>
                    <div className="buttons-row">
                        <input
                            type="text"
                            name="contractName"
                            placeholder="Номер счёта"
                            style={{flex: 1}}
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            readOnly={!editable}
                        />
                        {
                            editable && <a className={`button-secondary`} type="button" onClick={onNumberChange}>
                                Сохранить
                            </a>
                        }
                    </div>
                </div>

                {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
                {!loading && contracts.map((contract) => (
                    <div key={contract.id} className="account-card">
                        <img src={contract.imageUrl ?? image} alt={contract.name} className="image image-cart"/>

                        <div className="description-column">
                            <Link to={`/contracts/${contract.id}`} className="title">
                                {contract.name}
                                {contract.isMain && <div className="main-badge">Основной</div>}
                            </Link>

                            <div className="account-item-badge">
                                <p className="digit">{contract.fee} ₽</p>
                                <p className="description">плата за обслуживание</p>
                            </div>

                            <div className="buttons-row">
                                <Link to={`/contracts/${contract.id}`} className="card-button secondary">
                                    Подробнее
                                </Link>
                                {(!contract.isMain && editable) &&
                                    <a className="card-button secondary" type="button"
                                       onClick={() => onMainChange(contract.id!)}>
                                        Сделать основным
                                    </a>}
                            </div>
                        </div>
                    </div>
                ))}
                {
                    editable && <div className="buttons-row">
                        <a className={`button-secondary ${submitting && "disabled"}`} type="button" onClick={onClear}>
                            Очистить
                        </a>

                        <button className={`button-primary ${submitting && "disabled"}`} type="button" onClick={onSubmit}>
                            {submitting ? "Оформляем..." : "Оформить"}
                        </button>
                    </div>
                }
            </div>
        </Layout>
    );
};

export default AccountPage;