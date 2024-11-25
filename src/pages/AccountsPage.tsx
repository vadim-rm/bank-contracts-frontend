import Layout from "../components/Layout.tsx";
import {FC, useEffect, useState} from "react";
import {ROUTE_LABELS} from "../Routes.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {Form, Spinner, Table} from "react-bootstrap";
import {HandlerGetAccountsListAccount} from "../api/Api.ts";
import {api} from "../api";
import {Link} from "react-router-dom";
import {accountStatuses} from "../api/constants.ts";
import "./AccountsPage.css"

const AccountsPage: FC = () => {
    const [accounts, setAccounts] = useState<HandlerGetAccountsListAccount[]>([])
    const [status, setStatus] = useState("any")
    const [loading, setLoading] = useState(false)
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)

    useEffect(() => {
        setLoading(true)
        api.accounts.accountsList({
            status: status === "any" ? undefined : status,
            from: startDate?.toISOString(),
            to: endDate?.toISOString(),
        }).then((response) => {
            setAccounts(response.data.accounts!)
        }).finally(() => setLoading(false))
    }, [endDate, startDate, status])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString()
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
            </div>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            {!loading && accounts.length === 0 && <div>Нет заявок на счета</div>}
            {!loading && accounts.length > 0 &&
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Статус</th>
                        <th>Дата создания</th>
                        <th>Дата подачи</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {accounts.map((account, index) => (
                        <tr key={index}>
                            <td>{account.id}</td>
                            <td>{accountStatuses[account.status!]}</td>
                            <td>{formatDate(account.createdAt!)}</td>
                            <td>{formatDate(account.requestedAt!)}</td>
                            <td><Link to={`/accounts/${account.id}`}>Открыть</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>}
        </Layout>
    )
}

export default AccountsPage;