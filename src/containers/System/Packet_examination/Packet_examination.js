// import React, { Component } from "react";
// import { connect } from "react-redux";
// import * as actions from "../../../store/actions";
// import { CommonUtils } from "../../../utils";
// import "./Packet_examination.scss";
// import { FormattedMessage } from "react-intl";
// import Lightbox from "react-image-lightbox";
// import Select from "react-select";
// import { toast } from "react-toastify";
// import {
//   createPacketService,
//   getAllPacketService,
//   deletePacketService,
//   updatePacketService,
// } from "../../../services/userService";
// // import TableManage from "./TableManage";
// import CKEditorFieldBasic from "../../../components/Ckeditor/CKEditorFieldBasic";

// class Packet_examination extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       price: "",
//       selectedClinic: "",
//       selectedType: "",
//       content: "",
//       title: "",
//       previewImgUrl: "",
//       image: "",
//       description: "",
//       listPacket: [],
//       isEdit: false,
//       clinicIdEdit: -1,
//       options: [
//         { value: "E1", label: "Cơ bản" },
//         { value: "E2", label: "Nâng cao" },
//         { value: "E3", label: "Nam" },
//         { value: "E4", label: "Nữ" },
//       ],
//     };
//   }

//   async componentDidMount() {
//     this.props.getListClinicAdmin();
//     this.fetchDatable();
//   }
//   async componentDidUpdate(prevProps, prevState, snapshot) {
//     if (this.state.listPacket != prevState.listPacket) {
//       // let listPacket1 = await getAllPacketService();
//       this.setState({
//         //   listPacket: listPacket1.data,
//       });
//     }
//   }
//   fetchDatable = async () => {
//     let listPacket = await getAllPacketService();
//     this.setState({
//       listPacket: listPacket.data,
//     });
//   };
//   deleteSpecialty = async (id) => {
//     let res = await deletePacketService(id);
//     if (res.errCode === 0) {
//       this.fetchDatable();
//       toast.success("Xóa gói khám thành công");
//     } else toast.error("Xóa gói khám thất bại");
//   };

//   editPacket = async (data) => {
//     let selectedPacket = this.props.listClinic.filter(
//       (i) => i && i.id === data.clinicId
//     );
//     let { name: label, id: value } = selectedPacket[0];
//     let selectedClinic = { label, value };
//     let selectedType = this.state.options.filter(
//       (i) => i && i.value === data.typepacket
//     );

//     this.setState({
//       title: data.title ? data.title : "",
//       image: data.image ? data.image : "",
//       previewImgUrl: data.image ? data.image : "",
//       content: data.content ? data.content : "",
//       price: data.price ? data.price : "",
//       description: data.description ? data.description : "",
//       selectedClinic: selectedClinic,
//       selectedType: selectedType[0],
//       clinicIdEdit: data.id,
//       isEdit: true,
//     });
//   };

//   buildDataInputSelect = (data) => {
//     let result = [];
//     if (data && data.length > 0) {
//       let object;
//       data.forEach((item) => {
//         object = {
//           label: item.name,
//           value: item.id,
//         };
//         result.push(object);
//       });
//     }
//     return result;
//   };
//   handleChangeSelectClinic = (selectedOption) => {
//     this.setState({
//       selectedClinic: selectedOption,
//     });
//   };
//   handleChangeSelectType = (selectedOption) => {
//     this.setState({
//       selectedType: selectedOption,
//     });
//   };

//   createPacket = async () => {
//     let data = {
//       price: this.state.price,
//       clinicId: this.state.selectedClinic.value,
//       content: this.state.content,
//       title: this.state.title,
//       image: this.state.image,
//       type: this.state.selectedType.value,
//       description: this.state.description,
//     };
//     if (!this.state.isEdit) {
//       let res = await createPacketService(data);
//       if (res.errCode === 0) {
//         toast.success("Tạo gói khám thành công");
//         this.clearState();
//         this.fetchDatable();
//       } else toast.error("Tạo gói khám thất bại");
//     } else {
//       data.id = this.state.clinicIdEdit;
//       let res = await updatePacketService(data);
//       if (res.errCode === 0) {
//         toast.success("Chỉnh sửa gói khám thành công");
//         this.clearState();
//         this.setState({
//           isEdit: false,
//         });
//         this.fetchDatable();
//       } else toast.error("Chỉnh sửa gói khám thất bại");
//       console.log(data.type);
//     }
//   };

//   clearState = () => {
//     this.setState({
//       price: "",
//       selectedClinic: "",
//       selectedType: "",
//       content: "",
//       title: "",
//       previewImgUrl: "",
//       image: "",
//       description: "",
//     });
//   };

//   handleOnChangeImage = async (event) => {
//     const data = event.target.files;
//     const file = data[0];
//     if (file) {
//       let base64 = await CommonUtils.getBase64(file);
//       const url = URL.createObjectURL(file);
//       this.setState({
//         previewImgUrl: url,
//         image: base64,
//       });
//     }
//     // result.image = new Buffer.from(result.image, "base64").toString(
//     //   "binary"
//     // );
//   };

//   openReviewImage = () => {
//     if (!this.state.previewImgUrl) return;
//     this.setState({
//       isOpen: true,
//     });
//   };

//   handleEditorChange = (content) => {
//     this.setState({
//       content,
//     });
//   };
//   handleOnChangeInput = (event, id) => {
//     let copyState = { ...this.state };
//     copyState[id] = event.target.value;
//     this.setState({
//       ...copyState,
//     });
//   };
//   openReview = () => {
//     if (!this.state.previewImgUrl) return;
//     this.setState({
//       isOpen: true,
//     });
//   };
//   render() {
//     let optionsClinic = this.buildDataInputSelect(this.props.listClinic);
//     let { listPacket } = this.state;
//     return (
//       <div className="container">
//         <div className=" my-3 row p-0">
//           <div className="centerTitle">
//             <h2
//               style={{
//                 width: "100%",
//                 color: "#0071ba",
//                 margin: "auto",
//                 fontSize: "25px",
//                 fontWeight: "bold",
//               }}
//               className="mb-5"
//             >
//               <FormattedMessage id="admin.manage-packet.title" />
//             </h2>
//           </div>

//           <div className=" col-4 form-group">
//             <label htmlFor="clinicName">
//               <FormattedMessage id="admin.manage-packet.selectClinic" />
//             </label>
//             <Select
//               name="clinicName"
//               // className="form-control"
//               value={this.state.selectedClinic}
//               onChange={this.handleChangeSelectClinic}
//               options={optionsClinic}
//               placeholder={
//                 <FormattedMessage id="admin.manage-packet.selectClinic" />
//               }
//             />
//           </div>

//           <div className="col-4 form-group ">
//             <label htmlFor="title">
//               {<FormattedMessage id="admin.manage-packet.selectName" />}
//             </label>
//             <input
//               onChange={(event) => {
//                 this.handleOnChangeInput(event, "title");
//               }}
//               className="form-control"
//               value={this.state.title}
//               type="text"
//               name="title"
//             />
//           </div>
//           <div className="col-4 form-group">
//             <label htmlFor="price">
//               {<FormattedMessage id="admin.manage-packet.selectPrice" />}
//             </label>
//             <input
//               onChange={(event) => {
//                 this.handleOnChangeInput(event, "price");
//               }}
//               value={this.state.price}
//               className="form-control "
//               type="text"
//               name="price"
//             />
//           </div>
//           <div className=" col-4 form-group mt-3">
//             <label htmlFor="clinicName">
//               {<FormattedMessage id="admin.manage-packet.Type" />}
//             </label>
//             <Select
//               name="clinicName"
//               value={this.state.selectedType}
//               onChange={this.handleChangeSelectType}
//               options={this.state.options}
//               placeholder={<FormattedMessage id="admin.manage-packet.Type" />}
//             />
//           </div>

//           <div className="col-6 form-group mt-3">
//             <label>
//               <FormattedMessage id="admin.manage-clinic.logo" />
//             </label>
//             <input
//               id="previewLogo"
//               type="file"
//               hidden
//               onChange={(event) => this.handleOnChangeImage(event, "logo")}
//             />
//             <div className="preview-img-container">
//               <label className="lable-upload" htmlFor="previewLogo">
//                 <FormattedMessage id="admin.manage-clinic.upload" />
//                 <i className="fas fa-upload"></i>
//               </label>
//               <div
//                 className="preview-image"
//                 style={{
//                   backgroundImage: `url(${this.state.previewImgUrl})`,
//                 }}
//                 onClick={() => this.openReview()}
//               ></div>
//             </div>
//           </div>
//           <div className="col-12 form-group">
//             <label htmlFor="description">
//               {<FormattedMessage id="admin.manage-packet.description" />}
//             </label>
//             <textarea
//               name="description"
//               className="form-control"
//               value={this.state.description}
//               onChange={(event) => {
//                 this.handleOnChangeInput(event, "description");
//               }}
//               cols="30"
//               rows="10"
//             ></textarea>
//           </div>
//         </div>
//         <FormattedMessage id="admin.manage-packet.details" />
//         <CKEditorFieldBasic
//           value={this.state.content}
//           onChange={this.handleEditorChange}
//         />
//         <button
//           className={
//             this.state.isEdit
//               ? "btn btn-warning mt-2 p-2"
//               : "btn btn-primary mt-2 p-2"
//           }
//           onClick={this.createPacket}
//         >
//           {this.state.isEdit === true ? "Chỉnh sửa" : "Tạo gói khám"}
//         </button>
//         {/* {listPacket && listPacket.length && (
//           <TableManage
//             listRender={listPacket}
//             handleEdit={this.editPacket}
//             handleDelete={this.deleteSpecialty}
//             className="mt-4"
//           />
//         )} */}
//         {this.state.isOpen === true && (
//           <Lightbox
//             mainSrc={this.state.previewImgUrl}
//             onCloseRequest={() => this.setState({ isOpen: false })}
//           />
//         )}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     language: state.app.language,
//     listClinic: state.admin.listClinic,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     // createASpecialty: (data) => dispatch(actions.createASpecialty(data)),
//     // getSpecialtiesHome: () => dispatch(actions.getSpecialtiesHome()),
//     getListClinicAdmin: () => dispatch(actions.getListClinicAdmin()),
//     // getListSpecialtyByClinicId: (id) =>
//     //   dispatch(actions.getListSpecialtyByClinicId(id)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Packet_examination);
