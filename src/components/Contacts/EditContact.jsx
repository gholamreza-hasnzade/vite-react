import { useEffect, useState, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import {
    getContact,
    getAllGroups,
    updateContact,
} from "../../services/contactService";
import { Spinner } from "../";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import maNtakingNote from "../../assets/man-taking-note.png";
import { ContactContext } from "../../context/contactContext";

const EditContact = () => {
    const {
        loading,
        setLoading,
        groups,
        contacts,
        setContacts,
        setFilteredContacts,
    } = useContext(ContactContext);
    const [contact, setContact] = useState({});

    const { contactId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);

                setLoading(false);
                setContact(contactData);
            } catch (error) {
                console.log(error.message);
                setContact({});
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const setContactChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value,
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const { data, status } = await updateContact(contact, contactId);
            if (status === 200) {
                setLoading(false);

                const allContancts = [...contacts];
                const contactIndex = allContancts.findIndex(
                    (c) => c.id === Number(contactId)
                );
                allContancts[contactIndex] = { ...data };
                setContacts(allContancts);
                setFilteredContacts(allContancts);
                navigate("/contacts");
            }
        } catch (err) {
            console.log(err);
            setLoading(true);
        }
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p
                                        className="h4 fw-bold"
                                        style={{ color: ORANGE }}
                                    >
                                        ???????????? ??????????
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: ORANGE }} />
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{
                                    backgroundColor: "#44475a",
                                    borderRadius: "1em",
                                }}
                            >
                                <div className="col-md-8">
                                    <div className="col-md-8">
                                        <form onSubmit={submitForm}>
                                            <div className="mb-2">
                                                <input
                                                    name="fullname"
                                                    type="text"
                                                    className="form-control"
                                                    value={contact.fullname}
                                                    onChange={setContactChange}
                                                    required={true}
                                                    placeholder="?????? ?? ?????? ????????????????"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    name="photo"
                                                    type="text"
                                                    value={contact.photo}
                                                    onChange={setContactChange}
                                                    className="form-control"
                                                    required={true}
                                                    placeholder="???????? ??????????"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    name="mobile"
                                                    type="number"
                                                    className="form-control"
                                                    value={contact.mobile}
                                                    onChange={setContactChange}
                                                    required={true}
                                                    placeholder="?????????? ????????????"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    name="email"
                                                    type="email"
                                                    className="form-control"
                                                    value={contact.email}
                                                    onChange={setContactChange}
                                                    required={true}
                                                    placeholder="???????? ??????????"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <input
                                                    name="job"
                                                    type="text"
                                                    className="form-control"
                                                    value={contact.job}
                                                    onChange={setContactChange}
                                                    required={true}
                                                    placeholder="??????"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <select
                                                    name="group"
                                                    value={contact.group}
                                                    onChange={setContactChange}
                                                    required={true}
                                                    className="form-control"
                                                >
                                                    <option value="">
                                                        ???????????? ????????
                                                    </option>
                                                    {groups.length > 0 &&
                                                        groups.map((group) => (
                                                            <option
                                                                key={group.id}
                                                                value={group.id}
                                                            >
                                                                {group.name}
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>

                                            <div className="mb-2">
                                                <input
                                                    type="submit"
                                                    className="btn"
                                                    style={{
                                                        backgroundColor: PURPLE,
                                                    }}
                                                    value="???????????? ??????????"
                                                />
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn mx-2"
                                                    style={{
                                                        backgroundColor:
                                                            COMMENT,
                                                    }}
                                                >
                                                    ????????????
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-4">
                                        <img
                                            src={contact?.photo}
                                            className="img-fluid rounded"
                                            style={{
                                                border: `1px solid ${PURPLE}`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={maNtakingNote}
                                height="300px"
                                style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default EditContact;
