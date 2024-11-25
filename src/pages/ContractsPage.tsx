import {FC, useEffect, useState} from 'react'
import './ContractsPage.css'
import Layout from "../components/Layout.tsx";
import Input from "../components/Input.tsx";
import TabFilter from "../components/TabFilter.tsx";
import {Spinner} from "react-bootstrap";
import {CONTRACTS_MOCK} from "../modules/mock.ts";
import ContractCard from "../components/ContractCard.tsx";
import {ROUTE_LABELS} from "../Routes.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {setName, setType, useName, useType} from "../slices/filters.ts";
import {useDispatch} from "react-redux";
import {api} from "../api";
import {HandlerContractResponse} from "../api/Api.ts";
import {useAsyncError} from "../api/useAsyncError.ts";
import Account from "../components/Account.tsx";

const ContractsPage: FC = () => {
    const type = useType()
    const search = useName()
    const dispatch = useDispatch()
    const throwError = useAsyncError();

    const [loading, setLoading] = useState(false)
    const [contracts, setContracts] = useState<HandlerContractResponse[]>([])
    const [draftCount, setDraftCount] = useState<number | undefined>()
    const [draftId, setDraftId] = useState<number | undefined>()

    const load = (force = true) => {
        if (force) setLoading(true);
        api.contracts.contractsList({contractName: search, contractType: type !== '' ? type : undefined})
            .then((response) => {
                setContracts(response.data.contracts!)
                setDraftCount(response.data.account?.count)
                setDraftId(response.data.account?.id)

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

    const addToAccount = (id: number) => {
        api.contracts.draftCreate(id).then(() => {
            load(false)
        }).catch(throwError)
    }

    useEffect(() => {
        load()
    }, [type])

    return <Layout>
        <BreadCrumbs crumbs={[{label: ROUTE_LABELS.CONTRACTS}]}/>
        <div className="search-column">
            <div className="search-row">
                <h1>Договоры</h1>
                <Account accountId={draftId} itemCount={draftCount}/>
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
                              id={contract.id!} description={contract.description!} fee={contract.fee!}
                              imageUrl={contract.imageUrl} imagePosition={index % 2 === 0 ? "right" : "left"}
                              name={contract.name!} onAddToAccount={() => addToAccount(contract.id!)}/>
            ))}
        </div>
    </Layout>
}

export default ContractsPage