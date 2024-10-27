import {FC, useEffect, useState} from 'react'
import './ContractsPage.css'
import Layout from "../components/Layout.tsx";
import {useParams} from "react-router-dom";
import {ROUTE_LABELS, ROUTES} from "../Routes.ts";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {Contract, getContract} from "../modules/contractsApi.ts";
import './ContractPage.css'
import {CONTRACTS_MOCK} from "../modules/mock.ts";
import {Spinner} from "react-bootstrap";
import image from "../assets/defaultImage.png";

const ContractPage: FC = () => {
    const params = useParams<{ id: number }>()
    const [contract, setContract] = useState<Contract | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getContract(params.id).then((response) => {
            setContract(response)
            setLoading(false)
        })
            .catch(() => {
                setContract(
                    CONTRACTS_MOCK.contracts.filter((contract) => contract.id == params.id)[0]
                )
                setLoading(false);
            });
    }, []);

    return <Layout>
        <BreadCrumbs crumbs={[
            {
                label: ROUTE_LABELS.CONTRACTS,
                path: ROUTES.CONTRACTS
            },
            {
                label: contract?.name ?? "Договор",
            }
        ]}/>
        {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
        {contract &&
            <div className="hero-row">
                <img src={contract.imageUrl ?? image} className="image"/>
                <div className="hero-column">
                    <h2 className="title">{contract.name}</h2>
                    <p className="description">{contract.description}</p>
                    <div className="contract-badge">
                        <p className="digit">{contract.fee} ₽</p>
                        <p className="description">плата за обслуживание</p>
                    </div>
                </div>
            </div>
        }
    </Layout>
}

export default ContractPage