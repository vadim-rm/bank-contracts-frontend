import {FC, useEffect, useState} from "react";
import Layout from "../components/Layout";
import {BreadCrumbs} from "../components/BreadCrumbs";
import {Form, Spinner} from "react-bootstrap";
import AccountCard from "../components/AccountCard";
import {ROUTE_LABELS} from "../Routes";
import {fetchAccounts, setCreator, setEndDate, setStartDate, setStatus, updateAccountStatus,} from "../slices/accounts";
import "./AccountsPage.css";
import {useIsModerator} from "../slices/user";
import {useAppDispatch} from "../store.ts";
import {useAccounts} from "../slices/accounts.ts";

const AccountsPage: FC = () => {
    const dispatch = useAppDispatch();
    const isModerator = useIsModerator();

    const {accounts, status, loading, startDate, endDate, creator} = useAccounts();

    const [localStartDate, setLocalStartDate] = useState<string>(startDate || "");
    const [localEndDate, setLocalEndDate] = useState<string>(endDate || "");

    useEffect(() => {
        dispatch(fetchAccounts());
        const interval = setInterval(() => {
            dispatch(fetchAccounts());
        }, 2000);
        return () => clearInterval(interval);
    }, [dispatch, status, loading, startDate, endDate]);

    const handleStartDateBlur = () => {
        if (localStartDate !== startDate) {
            dispatch(setStartDate(localStartDate));
            dispatch(fetchAccounts());
        }
    };

    const handleEndDateBlur = () => {
        if (localEndDate !== endDate) {
            dispatch(setEndDate(localEndDate));
            dispatch(fetchAccounts());
        }
    };

    const filteredAccounts = accounts.filter((account) =>
        account.creator!.toLowerCase().includes(creator.toLowerCase())
    );

    return (
        <Layout>
            <BreadCrumbs crumbs={[{label: ROUTE_LABELS.ACCOUNTS}]}/>
            <div className="filters-row">
                <div className="filter">
                    <p className="filter-label">Статус</p>
                    <Form.Select
                        className="filter-control"
                        value={status}
                        onChange={(e) => dispatch(setStatus(e.target.value))}
                    >
                        <option value="any">Любой</option>
                        <option value="applied">Подана</option>
                        <option value="finalized">Исполнена</option>
                        <option value="rejected">Отклонена</option>
                    </Form.Select>
                </div>
                <div className="filter">
                    <p className="filter-label">Дата начала</p>
                    <Form.Control
                        className="filter-control"
                        type="date"
                        value={localStartDate}
                        onChange={(e) => setLocalStartDate(e.target.value)}
                        onBlur={handleStartDateBlur}
                    />
                </div>
                <div className="filter">
                    <p className="filter-label">Дата окончания</p>
                    <Form.Control
                        className="filter-control"
                        type="date"
                        value={localEndDate}
                        onChange={(e) => setLocalEndDate(e.target.value)}
                        onBlur={handleEndDateBlur}
                    />
                </div>
                {isModerator && (
                    <div className="filter">
                        <p className="filter-label">Создатель</p>
                        <Form.Control
                            className="filter-control"
                            type="input"
                            value={creator}
                            onChange={(e) => dispatch(setCreator(e.target.value))}
                        />
                    </div>
                )}
            </div>
            {loading && <div className="loadingBg"><Spinner animation="border"/></div>}
            {!loading && accounts.length === 0 && <div>Нет заявок на счета</div>}
            {!loading &&
                filteredAccounts.map((account, index) => (
                    <AccountCard
                        key={index}
                        {...account}
                        onChangeStatus={(id, status) =>
                            dispatch(updateAccountStatus({id, status}))
                        }
                    />
                ))}
        </Layout>
    );
};

export default AccountsPage;
