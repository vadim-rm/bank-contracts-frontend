import Layout from "../components/Layout.tsx";
import {FC, useCallback, useEffect, useState} from "react";
import {ROUTE_LABELS} from "../Routes.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {Form, Spinner} from "react-bootstrap";
import {HandlerGetAccountsListAccount} from "../api/Api.ts";
import {api} from "../api";
import "./AccountsPage.css"
import AccountCard from "../components/AccountCard.tsx";
import {useIsModerator} from "../slices/user.ts";

const AccountsPage: FC = () => {
    const isModerator = useIsModerator()
    const [accounts, setAccounts] = useState<HandlerGetAccountsListAccount[]>([])
    const [status, setStatus] = useState("any")
    const [loading, setLoading] = useState(true)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [creator, setCreator] = useState<string>('')

    const load = useCallback(() => {
        api.accounts.accountsList({
            status: status === "any" ? undefined : status,
            from: startDate?.toISOString(),
            to: endDate?.toISOString(),
        }).then((response) => {
            setAccounts(response.data.accounts!)
        }).finally(() => setLoading(false))
    }, [endDate, startDate, status])

    useEffect(() => {
        load()
        const id = setInterval(load, 2000);
        return () => clearInterval(id);
    }, [load])

    const filterAccounts = () => accounts.filter((account) =>
        account.creator!.toLowerCase().includes(creator.toLowerCase()))

    const changeStatus = (id: number, status: string) => {
        api.accounts.completeUpdate(id, {
            status: status
        }).then(() => {
            load()
        })
    }

    return (
        <Layout>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ACCOUNTS}]}/>
            <div className="filters-row">
                <div className="filter">
                    <p className="filter-label">Статус</p>
                    <Form.Select className="filter-control"
                                 onChange={(e) => setStatus(e.target.value)}>
                        <option value="any">Любой</option>
                        <option value="applied">Подана</option>
                        <option value="finalized">Исполнена</option>
                        <option value="rejected">Отклонена</option>
                    </Form.Select>
                </div>
                <div className="filter">
                    <p className="filter-label">Дата начала</p>
                    <Form.Control className="filter-control"
                                  type="date"
                                  onChange={(e) => setStartDate(new Date(e.target.value))}/>
                </div>
                <div className="filter">
                    <p className="filter-label">Дата окончания</p>
                    <Form.Control className="filter-control"
                                  type="date"
                                  onChange={(e) => setEndDate(new Date(e.target.value))}/>
                </div>
                {isModerator && <div className="filter">
                    <p className="filter-label">Создатель</p>
                    <Form.Control className="filter-control"
                                  type="input"
                                  onChange={(e) => setCreator(e.target.value)}/>
                </div>}
            </div>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            {!loading && accounts.length === 0 && <div>Нет заявок на счета</div>}
            {!loading && accounts.length > 0 &&
                filterAccounts().map((account, index) => (
                    <AccountCard key={index} {...account} onChangeStatus={changeStatus}/>
                ))}
        </Layout>
    )
}

export default AccountsPage;