import React, { useEffect, useState, useContext } from "react";

import { Spinner } from "../";
import { CURRENTLINE, CYAN, PURPLE } from "../../helpers/colors";
import { Link, useParams } from "react-router-dom";
import { getContact, getGroup } from "../../services/contactService";
import { ContactContext } from "../../context/contactContext";

const ViewContact = () => {
    const { loading, setLoading } = useContext(ContactContext);
    const { contactId } = useParams();
    const [state, setstate] = useState({
        contact: {},
        group: {},
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setstate({ ...state });
                setLoading(true);
                const { data: contactData } = await getContact(contactId);
                const { data: groupData } = await getGroup(contactData.group);

                setLoading(false);
                setstate({
                    ...state,
                    contact: contactData,
                    group: groupData,
                });
            } catch (error) {
                console.log(error.message);
                setstate({ ...state });
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const { contact, group } = state;

    return (
        <>
            <section className="view-contact-intro p3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{ color: CYAN }}>
                            اطلاعات مخاطب
                        </p>
                    </div>
                </div>
            </section>

            <hr style={{ backgroundColor: CYAN }} />

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {Object.keys(contact).length > 0 && (
                        <section className="view-contact mt-e">
                            <div
                                className="container p-2"
                                style={{
                                    borderRadius: "1em",
                                    backgroundColor: CURRENTLINE,
                                }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src="https://via.placeholder.com/200"
                                            alt=""
                                            className="img-fluid rounded"
                                            style={{
                                                border: `1px solid ${PURPLE}`,
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="list-group">
                                            <div className="list-group-item list-group-item-dark">
                                                <ul className="list-group">
                                                    <li className="list-group-item list-group-item-dark">
                                                        نام و نام خانوادگی :{" "}
                                                        <span className="fw-bold">
                                                            {contact?.fullname}
                                                        </span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-dark">
                                                        شماره موبایل :{" "}
                                                        <span className="fw-bold">
                                                            {contact?.mobile}
                                                        </span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-dark">
                                                        ایمیل :{" "}
                                                        <span className="fw-bold">
                                                            {contact?.email}
                                                        </span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-dark">
                                                        شغل :{" "}
                                                        <span className="fw-bold">
                                                            {contact?.job}
                                                        </span>
                                                    </li>
                                                    <li className="list-group-item list-group-item-dark">
                                                        گروه :{" "}
                                                        <span className="fw-bold">
                                                            {group?.name}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <Link
                                            to={"/contacts"}
                                            className="btn"
                                            style={{ backgroundColor: PURPLE }}
                                        >
                                            برگشت به صفحه اصلی
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )}
        </>
    );
};

export default ViewContact;
