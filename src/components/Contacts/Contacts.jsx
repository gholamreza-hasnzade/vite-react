import React, { useContext } from "react";
import { CURRENTLINE, ORANGE, PINK } from "../../helpers/colors";
import nofound from "../../assets/no-found.gif";
import Contact from "./Contact";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";

const Contacts = () => {
    const { contacts, deleteContact, loading } = useContext(ContactContext);

    return (
        <>
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 float-end">
                                <Link
                                    to={"/contacts/add"}
                                    className="btn mt-4"
                                    style={{ backgroundColor: PINK }}
                                >
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2" />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {loading ? (
                <Spinner />
            ) : (
                <section className="container">
                    <div className="row">
                        {contacts.length > 0 ? (
                            contacts.map((c) => (
                                <Contact
                                    deleteContact={() =>
                                        deleteContact(c.id, c.fullname)
                                    }
                                    key={c.id}
                                    contact={c}
                                />
                            ))
                        ) : (
                            <div
                                className="text-center py-5"
                                style={{ backgroundColor: CURRENTLINE }}
                            >
                                <p className="h3" style={{ color: ORANGE }}>
                                    مخاطب یافت نشد ...
                                </p>
                                <img
                                    src={nofound}
                                    alt="پیدا نشد"
                                    className="w-25"
                                />
                            </div>
                        )}
                    </div>
                </section>
            )}
        </>
    );
};

export default Contacts;
