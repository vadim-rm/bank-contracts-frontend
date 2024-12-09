import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import Layout from "../components/Layout.tsx";
import {BreadCrumbs} from "../components/BreadCrumbs.tsx";
import {Button, Form} from "react-bootstrap";
import "./ContractEditPage.css";
import {api} from "../api";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTE_LABELS, ROUTES} from "../Routes.ts";
import image from "../assets/defaultImage.png";

const ContractEditPage: FC = () => {
    const navigate = useNavigate()
    const {id} = useParams<{ id?: string }>()

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const [name, setName] = useState<string | undefined>()
    const [description, setDescription] = useState<string | undefined>()
    const [fee, setFee] = useState<number | undefined>()
    const [imageUrl, setImageUrl] = useState<string | undefined>()
    const [type, setType] = useState<string | undefined>()

    const load = () => {
        if (!id) return
        api.contracts.contractsDetail(parseInt(id)).then((response) => {
            setName(response.data.name!)
            setDescription(response.data.description!)
            setFee(response.data.fee!)
            setImageUrl(response.data.imageUrl)
            setType(response.data.type)
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        load()
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!id) {
            api.contracts.contractsCreate({
                name: name,
                description: description,
                fee: fee,
                type: type,
            }).then((response) => {
                navigate(`/contracts/${response.data.id}/edit`)
                setMessage("Договор успешно сохранен")
            })
        }
        api.contracts.contractsUpdate(parseInt(id!), {
            name: name,
            description: description,
            fee: fee,
            type: type,
        }).then((response) => {
            setName(response.data.name!)
            setDescription(response.data.description!)
            setFee(response.data.fee!)
            setImageUrl(response.data.imageUrl)
            setType(response.data.type)
            setMessage("Договор успешно сохранен")
        }).finally(() => setLoading(false))
    }

    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        api.contracts.imageUpdate(parseInt(id!), {image: file}).then((response) => {
            setName(response.data.name!)
            setDescription(response.data.description!)
            setFee(response.data.fee!)
            setImageUrl(response.data.imageUrl)
            setType(response.data.type)
        })
    }

    return <Layout>
        <BreadCrumbs crumbs={[{
            label: ROUTE_LABELS.CONTRACTS_MANAGEMENT,
            path: ROUTES.CONTRACTS_MANAGEMENT
        }, {label: name ?? "Создать договор"}]}/>
        <Form className="edit-contract-form" onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Фото</Form.Label>
                <img src={imageUrl ?? image} className="image"/>
                {id && <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    className="image-upload"
                    onChange={onImageChange}
                />}
                <Form.Label>Название</Form.Label>
                <Form.Control required
                              value={name} onChange={(e) => setName(e.target.value)}/>
                <Form.Label>Тип</Form.Label>
                <Form.Select className="filter-control"
                             onChange={(e) => setType(e.target.value)}>
                    <option disabled>Выберите тип</option>
                    <option value="acquiring">Эквайринг</option>
                    <option value="account">Расчётные счёта</option>
                </Form.Select>
                <Form.Label>Описание</Form.Label>
                <Form.Control required as="textarea"
                              value={description} onChange={(e) => setDescription(e.target.value)}/>
                <Form.Label>Стоимость обслуживания</Form.Label>
                <Form.Control required type="number"
                              value={fee} onChange={(e) => setFee(parseInt(e.target.value))}/>
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                className={`button-primary button-compact ${loading && "disabled"}`}
            >
                {loading ? "Загрузка..." : "Сохранить"}
            </Button>
            {message && <div className="message">{message}</div>}
        </Form>
    </Layout>
}

export default ContractEditPage;