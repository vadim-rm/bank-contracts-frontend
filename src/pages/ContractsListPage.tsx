import Layout from "../components/Layout.tsx";
import {FC, useEffect, useState} from "react";
import {ROUTE_LABELS} from "../Routes.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {Button, Spinner, Table} from "react-bootstrap";
import {HandlerContractResponse} from "../api/Api.ts";
import {api} from "../api";
import {Link, useNavigate} from "react-router-dom";
import "./AccountsPage.css"
import Input from "../components/Input.tsx";

const ContractsListPage: FC = () => {
    const navigate = useNavigate()
    const [contracts, setContracts] = useState<HandlerContractResponse[]>([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState('')


    const load = () => {
        api.contracts.contractsList({
            contractName: name,
        }).then(
            (response) => {
                setContracts(response.data.contracts!)
            }).finally(() => setLoading(false))
    }

    const deleteContract = (id: number) => {
        api.contracts.contractsDelete(id).then(() => {
            load()
        })
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <Layout>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.CONTRACTS_MANAGEMENT}]}/>
            <div className="filters-row">
                <div className="filter">
                    <p className="filter-label">Название</p>
                    <Input onChange={setName}
                           value={name}
                           onSubmit={load}
                    />
                </div>
            </div>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            {!loading && contracts.length === 0 && <div>Нет договоров</div>}
            {!loading && contracts.length > 0 &&
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Название</th>
                        <th>Стоимость обслуживания</th>
                        <th colSpan={2}>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {contracts.map((contract, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{contract.name}</td>
                            <td>{contract.fee}</td>
                            <td><Link to={`/contracts/${contract.id}/edit`}>Редактировать</Link></td>
                            <td><Link to="#" onClick={() => deleteContract(contract.id!)}>Удалить</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </Table>}
            <Button
                variant="primary"
                type="submit"
                className={`button-primary button-compact ${loading && "disabled"}`}
                onClick={() => navigate("/contracts/create")}
            >
                Добавить договор
            </Button>
        </Layout>
    )
}

export default ContractsListPage;