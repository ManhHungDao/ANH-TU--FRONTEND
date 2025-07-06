export const path = {
  HOME: "/*",
  ADMIN: "/admin/*",
  DOCTOR: "/doctor/*",
  ASSISTANT: "/assistant/*",
  PATIENT: "/patient/*",
  MANAGER: "/manager/*",
  PACKET: "/packet/*",
  HANDBOOK: "/handbook/*",
  DETAIL_HANDBOOK: "/handbook/:id",
  SPECIALTY: "/specialty/:id",
  CLINIC: "clinic/:id",
  DETAIL_PACKET: "/:id",
  DETAIL_DOCTOR: "detail-doctor/:id",
  CONFIRM_BOOKING: "/confirm-booking",
  VIEWMORE_SPECIALTY: "/viewmore/specialty",
  VIEWMORE_CLINIC: "/viewmore/clinic",
  VIEWMORE_DOCTOR: "/viewmore/doctor",
  FEEDBACK: "/feedback",

  SYSTEM_LOGIN: "/system-login",
  LOGIN: "/login",
  RESGISTER: "/register",
  LOG_OUT: "/logout",
  FORGOT_PASSWORD: "/forgot-password",
};

export const languages = {
  VI: "vi",
  EN: "en",
};

export const CRUD_ACTIONS = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  READ: "READ",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};
export const USER_ROLE = {
  ADMIN: "R1",
  DOCTOR: "R2",
  PATIENT: "R3",
};

export const TYPE = {
  ROLE: "ROLE",
  TIME: "TIME",
  POSITION: "POSITION",
  GENDER: "GENDER",
  PRICE: "PRICE",
  PROVINCE: "PROVINCE",
  PAYMENT: "PAYMENT",
  STATUS: "STATUS",
  SPECIALTY: "specialty",
  PACKET: "packet",
  CLINIC: "clinic",
  DOCTOR: "doctor",
};

export const scopes = {
  PATIENT_ACCESS: "patient.access",
  PATIENT_VIEW: "patient.view",
  PATIENT_DELETE: "patient.delete",

  USER_ACCESS: "user.access",
  USER_VIEW: "user.view",
  USER_ADD: "user.add",
  USER_UPDATE: "user.update",
  USER_DELETE: "user.delete",
  USER_SCHEDULE_ACCESS: "user.schedule.access",
  USER_SCHEDULE_VIEW: "user.schedule.view",
  USER_SCHEDULE_ADD: "user.schedule.add",
  USER_SCHEDULE_UPDATE: "user.schedule.update",
  USER_SCHEDULE_DELETE: "user.schedule.delete",

  ASSISTANT_SCHEDULE_ACCESS: "assistant.schedule.access",
  ASSISTANT_SCHEDULE_VIEW: "assistant.schedule.view",
  ASSISTANT_SCHEDULE_UPDATE: "assistant.schedule.update",
  ASSISTANT_SCHEDULE_RESULT: "assistant.schedule.result",

  CLINIC_ACCESS: "clinic.access",
  CLINIC_VIEW: "clinic.view",
  CLINIC_ADD: "clinic.add",
  CLINIC_UPDATE: "clinic.update",
  CLINIC_DELETE: "clinic.delete",

  PACKET_ACCESS: "packet.access",
  PACKET_VIEW: "packet.view",
  PACKET_ADD: "packet.add",
  PACKET_UPDATE: "packet.update",
  PACKET_DELETE: "packet.delete",
  PACKET_SCHEDULE_ACCESS: "packet.schedule.access",
  PACKET_SCHEDULE_VIEW: "packet.schedule.view",
  PACKET_SCHEDULE_ADD: "packet.schedule.add",
  PACKET_SCHEDULE_UPDATE: "packet.schedule.update",
  PACKET_SCHEDULE_DELETE: "packet.schedule.delete",

  SPECIALTY_ACCESS: "specialty.access",
  SPECIALTY_VIEW: "specialty.view",
  SPECIALTY_ADD: "specialty.add",
  SPECIALTY_UPDATE: "specialty.update",
  SPECIALTY_DELETE: "specialty.delete",

  HANDBOOK_ACCESS: "handbook.access",
  HANDBOOK_VIEW: "handbook.view",
  HANDBOOK_ADD: "handbook.add",
  HANDBOOK_UPDATE: "handbook.update",
  HANDBOOK_DELETE: "handbook.delete",

  CODE_ACCESS: "code.access",
  CODE_VIEW: "code.view",
  CODE_ADD: "code.add",
  CODE_UPDATE: "code.update",
  CODE_DELETE: "code.delete",
};

export const roles = {
  patient: [
    { value: scopes.PATIENT_ACCESS, name: "Truy cập người dùng" },
    { value: scopes.PATIENT_VIEW, name: "Xem người dùng" },
    { value: scopes.PATIENT_DELETE, name: "Xóa người dùng" },
  ],
  user: [
    { value: scopes.USER_ACCESS, name: "Truy cập bác sĩ" },
    { value: scopes.USER_VIEW, name: "Xem bác sĩ" },
    { value: scopes.USER_ADD, name: "Thêm bác sĩ" },
    { value: scopes.USER_UPDATE, name: "Cập nhập bác sĩ" },
    { value: scopes.USER_DELETE, name: "Xóa bác sĩ" },
    { value: scopes.USER_SCHEDULE_ACCESS, name: "Truy cập lịch khám" },
    { value: scopes.USER_SCHEDULE_VIEW, name: "Xem lịch khám" },
    { value: scopes.USER_SCHEDULE_ADD, name: "Thêm lịch khám" },
    { value: scopes.USER_SCHEDULE_UPDATE, name: "Cập nhập lịch khám" },
    { value: scopes.USER_SCHEDULE_DELETE, name: "Xóa lịch khám" },
  ],
  assistant: [
    { value: scopes.ASSISTANT_SCHEDULE_ACCESS, name: "Truy cập lịch khám" },
    { value: scopes.ASSISTANT_SCHEDULE_VIEW, name: "Xem lịch khám" },
    { value: scopes.ASSISTANT_SCHEDULE_UPDATE, name: "Cập nhập lịch khám" },
    { value: scopes.ASSISTANT_SCHEDULE_RESULT, name: "Cập nhập kết quả khám" },
  ],
  clinic: [
    { value: scopes.CLINIC_ACCESS, name: "Truy cập cơ sở" },
    { value: scopes.CLINIC_VIEW, name: "Xem phòng khám" },
    { value: scopes.CLINIC_ADD, name: "Thêm phòng khám" },
    { value: scopes.CLINIC_UPDATE, name: "Cập nhập phòng khám" },
    { value: scopes.CLINIC_DELETE, name: "Xóa phòng khám" },

    { value: scopes.PACKET_ACCESS, name: "Truy cập gói khám" },
    { value: scopes.PACKET_VIEW, name: "Xem gói khám" },
    { value: scopes.PACKET_ADD, name: "Thêm gói khám" },
    { value: scopes.PACKET_UPDATE, name: "Cập nhập gói khám" },
    { value: scopes.PACKET_DELETE, name: "Xóa gói khám" },
    { value: scopes.PACKET_SCHEDULE_ACCESS, name: "Truy cập lịch gói khám" },
    { value: scopes.PACKET_SCHEDULE_VIEW, name: "Xem lịch gói khám" },
    { value: scopes.PACKET_SCHEDULE_ADD, name: "Thêm lịch gói khám" },
    { value: scopes.PACKET_SCHEDULE_UPDATE, name: "Cập nhập lịch gói khám" },
    { value: scopes.PACKET_SCHEDULE_DELETE, name: "Xóa lịch gói khám" },
  ],
  specialty: [
    { value: scopes.SPECIALTY_ACCESS, name: "Truy cập chuyên khoa" },
    { value: scopes.SPECIALTY_VIEW, name: "Xem chuyên khoa" },
    { value: scopes.SPECIALTY_ADD, name: "Thêm chuyên khoa" },
    { value: scopes.SPECIALTY_UPDATE, name: "Cập nhập chuyên khoa" },
    { value: scopes.SPECIALTY_DELETE, name: "Xóa chuyên khoa" },
  ],
  handbook: [
    { value: scopes.HANDBOOK_ACCESS, name: "Truy cập cẩm nang" },
    { value: scopes.HANDBOOK_VIEW, name: "Xem cẩm nang" },
    { value: scopes.HANDBOOK_ADD, name: "Thêm cẩm nang" },
    { value: scopes.HANDBOOK_UPDATE, name: "Cập nhập cẩm nang" },
    { value: scopes.HANDBOOK_DELETE, name: "Xóa cẩm nang" },
  ],
  code: [
    { value: scopes.CODE_ACCESS, name: "Truy cập mã" },
    { value: scopes.CODE_VIEW, name: "Xem mã" },
    { value: scopes.CODE_ADD, name: "Thêm mã" },
    { value: scopes.CODE_UPDATE, name: "Cập nhập mã" },
    { value: scopes.CODE_DELETE, name: "Xóa mã" },
  ],
};
