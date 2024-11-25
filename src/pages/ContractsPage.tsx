import {FC, useEffect, useState} from 'react'
import './ContractsPage.css'
import Layout from "../components/Layout.tsx";
import Input from "../components/Input.tsx";
import TabFilter from "../components/TabFilter.tsx";
import {Spinner} from "react-bootstrap";
import {Contract, getContracts} from "../modules/contractsApi.ts";
import {CONTRACTS_MOCK} from "../modules/mock.ts";
import ContractCard from "../components/ContractCard.tsx";
import {ROUTE_LABELS} from "../Routes.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {setName, setType, useName, useType} from "../slices/filters.ts";
import {useDispatch} from "react-redux";

const ContractsPage: FC = () => {
    const type = useType()
    const search = useName()
    const dispatch = useDispatch()


    const [loading, setLoading] = useState(false)
    const [contracts, setContracts] = useState<Contract[]>([])

    const load = () => {
        setLoading(true);
        getContracts(search, type)
            .then((response) => {
                setContracts(response.contracts)
                setLoading(false)
            })
            .catch(() => {
                setContracts(
                    CONTRACTS_MOCK.contracts.filter((contract) =>
                        contract.name
                            .toLocaleLowerCase()
                            .includes(search.toLocaleLowerCase()) &&
                        (type === '' || contract.type === type)
                    )
                )
                setLoading(false);
            });
    }

    useEffect(() => {
        load()
    }, [type])

    return <Layout>
        <BreadCrumbs crumbs={[{label: ROUTE_LABELS.CONTRACTS}]}/>
        <div className="search-column">
            <div className="search-row">
                <h1>Договоры</h1>
            </div>
            <div className="search-row">
                <TabFilter tabs={[
                    {
                        name: "Все",
                        value: ""
                    },
                    {
                        name: "Эквайринг",
                        value: "acquiring"
                    },
                    {
                        name: "Расчётные счёта",
                        value: "account"
                    }
                ]} onChange={(value) => dispatch(setType(value))} value={type}/>
                <Input
                    value={search}
                    onChange={(value) => dispatch(setName(value))}
                    placeholder="Поиск"
                    onSubmit={load}/>
            </div>
        </div>
        <div className="card-container">
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}

            {(!contracts.length && !loading) && <>По вашему запросу ничего не найдено</>}

            {contracts.map((contract, index) => (
                <ContractCard key={index}
                              id={contract.id} description={contract.description} fee={contract.fee}
                              imageUrl={contract.imageUrl} imagePosition={index % 2 === 0 ? "right" : "left"}
                              name={contract.name}/>
            ))}
        </div>
    </Layout>
}

export default ContractsPage