import {FC, useEffect} from 'react'
import './ContractsPage.css'
import Layout from "../components/Layout.tsx";
import Input from "../components/Input.tsx";
import TabFilter from "../components/TabFilter.tsx";
import {Spinner} from "react-bootstrap";
import ContractCard from "../components/ContractCard.tsx";
import {ROUTE_LABELS} from "../Routes.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {fetchContracts, setName, setType, useName, useResponse, useType} from "../slices/contracts.ts";
import {api} from "../api";
import {useAsyncError} from "../api/useAsyncError.ts";
import Account from "../components/Account.tsx";
import {useAppDispatch} from "../store.ts";

const ContractsPage: FC = () => {
    const type = useType()
    const search = useName()
    const response = useResponse()
    const dispatch = useAppDispatch()
    const throwError = useAsyncError();

    const addToAccount = (id: number) => {
        api.contracts.draftCreate(id).then(() => {
            load()
        }).catch(throwError)
    }

    const load = () => {
        dispatch(fetchContracts({name: search, type: type}))
    }

    useEffect(() => {
        load()
    }, [type])

    return <Layout>
        <BreadCrumbs crumbs={[{label: ROUTE_LABELS.CONTRACTS}]}/>
        <div className="search-column">
            <div className="search-row">
                <h1>Договоры</h1>
                <Account accountId={response?.account?.id} itemCount={response?.account?.count}/>
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
            {!response?.contracts && <div className="loadingBg"><Spinner animation="border"/></div>}

            {(!response?.contracts?.length) && <>По вашему запросу ничего не найдено</>}

            {response?.contracts?.map((contract, index) => (
                <ContractCard key={index}
                              id={contract.id!} description={contract.description!} fee={contract.fee!}
                              imageUrl={contract.imageUrl} imagePosition={index % 2 === 0 ? "right" : "left"}
                              name={contract.name!} onAddToAccount={() => addToAccount(contract.id!)}/>
            ))}
        </div>
    </Layout>
}

export default ContractsPage