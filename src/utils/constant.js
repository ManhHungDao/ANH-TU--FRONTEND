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
  DETAIL_PACKET: "packet/:id",
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

// export const roles = {
//   patient: [
//     { value: "patient.access", name: "Truy cập người dùng" },
//     { value: "patient.view", name: "Xem danh sách người dùng" },
//     { value: "patient.delete", name: "Xóa người dùng" },
//   ],
//   user: [
//     { value: "user.access", name: "Truy cập bác sĩ" },
//     { value: "user.view", name: "Xem danh sách bác sĩ" },
//     { value: "user.add", name: "Thêm bác sĩ" },
//     { value: "user.update", name: "Cập nhập bác sĩ" },
//     { value: "user.delete", name: "Xóa bác sĩ" },
//     { value: "user.schedule.access", name: "Truy cập lịch khám" },
//     { value: "user.schedule.view", name: "Xem lịch khám" },
//     { value: "user.schedule.add", name: "Thêm lịch khám" },
//     { value: "user.schedule.update", name: "Cập nhập lịch khám" },
//     { value: "user.schedule.delete", name: "Xóa lịch khám" },
//   ],
//   clinic: [
//     { value: "clinic.access", name: "Truy cập cơ sở" },
//     { value: "clinic.view", name: "Xem danh sách phòng khám" },
//     { value: "clinic.add", name: "Thêm phòng khám" },
//     { value: "clinic.update", name: "Cập nhập phòng khám" },
//     { value: "clinic.delete", name: "Xóa phòng khám" },

//     { value: "packet.access", name: "Truy cập gói khám" },
//     { value: "packet.view", name: "Xem danh sách gói khám" },
//     { value: "packet.add", name: "Thêm gói khám" },
//     { value: "packet.update", name: "Cập nhập gói khám" },
//     { value: "packet.delete", name: "Xóa gói khám" },

//     { value: "packet.schedule.access", name: "Truy cập lịch gói khám" },
//     { value: "packet.schedule.view", name: "Xem lịch gói khám" },
//     { value: "packet.schedule.add", name: "Thêm lịch gói khám" },
//     { value: "packet.schedule.update", name: "Cập nhập lịch gói khám" },
//     { value: "packet.schedule.delete", name: "Xóa lịch gói khám" },
//   ],
//   specialty: [
//     { value: "specialty.access", name: "Truy cập chuyên khoa" },
//     { value: "specialty.view", name: "Xem danh sách" },
//     { value: "specialty.add", name: "Thêm chuyên khoa" },
//     { value: "specialty.update", name: "Cập nhập chuyên khoa" },
//     { value: "specialty.delete", name: "Xóa chuyên khoa" },
//   ],
//   handbook: [
//     { value: "handbook.access", name: "Truy cập cẩm nang" },
//     { value: "handbook.view", name: "Xem danh sách" },
//     { value: "handbook.add", name: "Thêm cẩm nang" },
//     { value: "handbook.update", name: "Cập nhập cẩm nang" },
//     { value: "handbook.delete", name: "Xóa cẩm nang" },
//   ],
//   code: [
//     { value: "code.access", name: "Truy cập mã" },
//     { value: "code.view", name: "Xem danh sách" },
//     { value: "code.add", name: "Thêm mã" },
//     { value: "code.update", name: "Cập nhập mã" },
//     { value: "code.delete", name: "Xóa mã" },
//   ],
// };

export const policies = `
<p>Điều kiện v&agrave; Điều khoản sử dụng Dịch vụ Tư vấn y tế từ xa (&ldquo;Điều kiện v&agrave; Điều khoản&rdquo;) n&agrave;y l&agrave; những quy định về mối quan hệ v&agrave; tr&aacute;ch nhiệm của Website hỗ trợ kh&aacute;m bệnh HealthCare (&ldquo;Đơn vị cung cấp Dịch vụ&rdquo; hoặc &ldquo;Ch&uacute;ng t&ocirc;i&rdquo;) v&agrave; Người sử dụng Dịch vụ (&ldquo;Kh&aacute;ch h&agrave;ng&rdquo;) trong việc Kh&aacute;ch h&agrave;ng đăng k&yacute; v&agrave; tham gia c&aacute;c buổi tư vấn trực tuyến với c&aacute;c Chuy&ecirc;n gia/B&aacute;c sỹ tại Ph&ograve;ng kh&aacute;m Online của Ch&uacute;ng t&ocirc;i th&ocirc;ng qua Website/Fanpage&hellip; hoặc c&aacute;c phương thức kh&aacute;c.</p>
<p><strong><strong>1. Giải th&iacute;ch thuật ngữ:</strong></strong></p>
<p>a. &ldquo;<strong><strong>Tư vấn y tế tư xa</strong></strong>&rdquo; l&agrave; h&igrave;nh thức tư vấn, cho lời khuy&ecirc;n trực tuyến, miễn ph&iacute; th&ocirc;ng qua việc trao đổi th&ocirc;ng tin giữa Chuy&ecirc;n gia/B&aacute;c sỹ của Ch&uacute;ng t&ocirc;i với Kh&aacute;ch h&agrave;ng bằng c&aacute;c c&ocirc;ng cụ giao tiếp trực tuyến như Website/Fanpage&hellip; (&ldquo;Dịch vụ&rdquo;).</p>
<p>b. &ldquo;<strong><strong>Lời khuy&ecirc;n</strong></strong>&rdquo; l&agrave; c&aacute;c th&ocirc;ng tin, &yacute; kiến do Chuy&ecirc;n gia/B&aacute;c sỹ của Ch&uacute;ng t&ocirc;i đưa ra trong qu&aacute; tr&igrave;nh trao đổi v&agrave; tư vấn với Kh&aacute;ch h&agrave;ng.</p>
<p><strong><strong>2. Th&ocirc;ng tin quan trọng:</strong></strong></p>
<p>a. Dịch vụ n&agrave;y kh&ocirc;ng được sử dụng trong c&aacute;c t&igrave;nh huống khẩn cấp c&oacute; khả năng đe dọa t&iacute;nh mạng hoặc c&aacute;c t&igrave;nh huống sức khỏe bị tổn thương, cần được xử tr&iacute; cấp cứu ngay lập tức (kể cả ph&aacute;t sinh trước hoặc trong qu&aacute; tr&igrave;nh sử dụng Dịch vụ).</p>
<p>b. Kh&ocirc;ng phải tất cả Kh&aacute;ch h&agrave;ng đều th&iacute;ch hợp cho Tư vấn y tế từ xa v&agrave; mỗi tư vấn được đề xuất đều phải được Ch&uacute;ng t&ocirc;i đ&aacute;nh gi&aacute; theo từng trường hợp cụ thể. Chuy&ecirc;n gia/B&aacute;c sỹ của Ch&uacute;ng t&ocirc;i v&agrave; Kh&aacute;ch h&agrave;ng đều c&oacute; quyền chọn ngừng tham gia tư vấn bất kể l&uacute;c n&agrave;o, v&igrave; bất cứ l&yacute; do g&igrave; được cho l&agrave; hợp l&yacute; bao gồm nhưng kh&ocirc;ng giới hạn như: Cần bổ sung/thay thế Chuy&ecirc;n gia/B&aacute;c sỹ c&oacute; chuy&ecirc;n khoa ph&ugrave; hợp hơn trong buổi tư vấn; Kh&aacute;ch h&agrave;ng đồng &yacute; chuyển sang sử dụng dịch vụ trực tiếp tại Bệnh viện Đa khoa T&acirc;m Anh TP. Hồ Ch&iacute; Minh; Kết th&uacute;c Dịch vụ Tư vấn y tế từ xa.</p>
<p>c. Kh&aacute;ch h&agrave;ng sử dụng Dịch vụ được mặc nhi&ecirc;n hiểu rằng đ&atilde; đọc v&agrave; hiểu r&otilde; những quy định tại Điều kiện v&agrave; Điều khoản n&agrave;y, đồng &yacute; với c&aacute;c quy định được đặt ra một c&aacute;ch tự nguyện.</p>
<p><strong><strong>3. Điều khoản miễn trừ tr&aacute;ch nhiệm đối với Đơn vị cung cấp Dịch vụ:</strong></strong></p>
<p>a. Ch&uacute;ng t&ocirc;i đảm bảo cử c&aacute;c Chuy&ecirc;n gia/B&aacute;c sỹ c&oacute; nhiều kinh nghiệm, uy t&iacute;n trong từng lĩnh vực, ph&ugrave; hợp bệnh l&yacute; mắc phải hoặc mối quan t&acirc;m về phương ph&aacute;p giữ g&igrave;n v&agrave; n&acirc;ng cao sức khỏe của Kh&aacute;ch h&agrave;ng để tham gia tư vấn. Tuy nhi&ecirc;n, c&aacute;c lời khuy&ecirc;n được c&aacute;c Chuy&ecirc;n gia/B&aacute;c sỹ đưa ra chỉ c&oacute; gi&aacute; trị tham khảo v&agrave; d&agrave;nh ri&ecirc;ng cho trường hợp của Kh&aacute;ch h&agrave;ng dựa theo c&aacute;c th&ocirc;ng tin m&agrave; Kh&aacute;ch h&agrave;ng đ&atilde; cung cấp. Để l&agrave;m r&otilde;, Ch&uacute;ng t&ocirc;i kh&ocirc;ng phải chịu bất cứ tr&aacute;ch nhiệm g&igrave; hoặc cam kết về t&iacute;nh hiệu quả trong việc cải thiện t&igrave;nh trạng sức khỏe của Kh&aacute;ch h&agrave;ng của bất kỳ một lời khuy&ecirc;n n&agrave;o do bất kỳ Chuy&ecirc;n gia/B&aacute;c sỹ n&agrave;o đưa ra.</p>
<p>b. Ch&uacute;ng t&ocirc;i thừa nhận v&agrave; duy tr&igrave; c&aacute;c lợi &iacute;ch của việc Tư vấn y tế từ xa mang lại cho Kh&aacute;ch h&agrave;ng như tiết kiệm thời gian v&agrave; chi ph&iacute;, tr&aacute;nh nguy cơ l&acirc;y nhiễm Covid-19 do việc phải ra khỏi nh&agrave; trong c&aacute;c thời điểm dịch b&ugrave;ng ph&aacute;t&hellip; Tuy nhi&ecirc;n, Dịch vụ n&agrave;y sẽ kh&ocirc;ng đảm bảo:</p>
<ul>
    <li>i. Thay thế cho h&igrave;nh thức thăm kh&aacute;m trực tiếp tại cơ sở y tế hoặc thực hiện bởi b&aacute;c sỹ ri&ecirc;ng của Kh&aacute;ch h&agrave;ng.</li>
    <li>ii. T&iacute;nh hiệu quả v&agrave; an to&agrave;n của c&aacute;c lời khuy&ecirc;n. Việc n&agrave;y phụ thuộc v&agrave;o t&iacute;nh ph&ugrave; hợp, đầy đủ, trung thực của tất cả th&ocirc;ng tin được Kh&aacute;ch h&agrave;ng cung cấp v&agrave; sử dụng th&ecirc;m c&aacute;c phương ph&aacute;p chẩn đo&aacute;n kh&aacute;c theo từng trường hợp cụ thể,&hellip;</li>
</ul>
<p>c. Đối với c&aacute;c lời khuy&ecirc;n nhận được, Kh&aacute;ch h&agrave;ng cần đ&aacute;nh gi&aacute;, c&acirc;n nhắc trước khi đưa ra quyết định &aacute;p dụng hoặc những quyết định c&oacute; li&ecirc;n quan. Ngo&agrave;i ra, Kh&aacute;ch h&agrave;ng sẽ chỉ sử dụng lời khuy&ecirc;n cho ch&iacute;nh bản th&acirc;n m&igrave;nh v&agrave; tự chịu mọi rủi ro trong việc sử dụng lời khuy&ecirc;n.</p>
<p>d. Kh&aacute;ch h&agrave;ng c&oacute; tr&aacute;ch nhiệm tiếp tục duy tr&igrave; v&agrave; bảo mật th&ocirc;ng tin về t&igrave;nh trạng sức khỏe v&agrave; đời tư của m&igrave;nh kể cả khi đ&atilde; chia sẻ cho Chuy&ecirc;n gia/B&aacute;c sỹ v&agrave; nh&acirc;n vi&ecirc;n kh&aacute;c của Ch&uacute;ng t&ocirc;i.</p>
<p>e. Việc tr&iacute;ch dẫn, bi&ecirc;n tập, chia sẻ bất kỳ th&ocirc;ng tin n&agrave;o, dưới bất kỳ h&igrave;nh thức n&agrave;o bao gồm nhưng kh&ocirc;ng giới hạn ở h&igrave;nh ảnh, &acirc;m thanh, tin nhắn, văn bản li&ecirc;n quan Dịch vụ do Kh&aacute;ch h&agrave;ng v&agrave;/hoặc b&ecirc;n thứ ba thực hiện (từ việc Kh&aacute;ch h&agrave;ng cung cấp/tiết lộ th&ocirc;ng tin), bất kể buổi tư vấn d&agrave;nh cho hoặc kh&ocirc;ng d&agrave;nh cho Kh&aacute;ch h&agrave;ng đều kh&ocirc;ng được ph&eacute;p, trừ trường hợp c&oacute; sự đồng &yacute; bằng văn bản của Ch&uacute;ng t&ocirc;i.</p>
<p>f. Ch&uacute;ng t&ocirc;i c&oacute; to&agrave;n quyền sở hữu v&agrave; sử dụng mọi th&ocirc;ng tin ph&aacute;t sinh trong qu&aacute; tr&igrave;nh Kh&aacute;ch h&agrave;ng sử dụng Dịch vụ. Ch&uacute;ng t&ocirc;i kh&ocirc;ng c&oacute; bất kỳ đảm bảo n&agrave;o đối với việc Kh&aacute;ch h&agrave;ng sử dụng những th&ocirc;ng tin&nbsp;thứn&ecirc;u tr&ecirc;n sẽ kh&ocirc;ng vi phạm bất kỳ quyền ph&aacute;t minh, sở hữu, sở hữu tr&iacute; tuệ hoặc quy định kh&aacute;c của Ch&uacute;ng t&ocirc;i hoặc b&ecirc;n thứ ba kh&aacute;c.</p>
<p>g. Website v&agrave; c&aacute;c c&ocirc;ng cụ sử dụng cho Dịch vụ của Ch&uacute;ng t&ocirc;i phụ thuộc v&agrave;o cơ sở hạ tầng, kết nối v&agrave; dịch vụ cung cấp bởi những nh&agrave; cung cấp dịch vụ cho Ch&uacute;ng t&ocirc;i. V&igrave; thế, Kh&aacute;ch h&agrave;ng chấp nhận rằng t&iacute;nh kịp thời, li&ecirc;n tục,&hellip; của Dịch vụ sẽ phụ thuộc một phần v&agrave;o những nh&agrave; cung cấp dịch vụ n&agrave;y. Trong trường hợp ph&aacute;t sinh sự cố kỹ thuật, Ch&uacute;ng t&ocirc;i sẽ thay mặt v&agrave;/hoặc hỗ trợ Kh&aacute;ch h&agrave;ng trong việc y&ecirc;u cầu c&aacute;c nh&agrave; cung cấp dịch vụ n&ecirc;u tr&ecirc;n để giải quyết c&aacute;c tr&aacute;ch nhiệm c&oacute; li&ecirc;n quan đối với Kh&aacute;ch h&agrave;ng theo đ&uacute;ng quy định ph&aacute;p luật.</p>
<p>h. Sự khả dụng v&agrave; khả năng hoạt động của Ch&uacute;ng t&ocirc;i phụ thuộc v&agrave;o rất nhiều t&igrave;nh huống kh&aacute;c nhau của ch&iacute;nh Ch&uacute;ng t&ocirc;i v&agrave; Kh&aacute;ch h&agrave;ng, bao gồm địa điểm sử dụng dịch vụ, mạng điện thoại di động v&agrave; độ khả dụng của mạng internet, cường độ t&iacute;n hiệu, v&agrave; khả năng hoạt động của phần cứng, phần mềm, nh&agrave; điều h&agrave;nh mạng di động, v&agrave; điện thoại di động v&agrave; m&aacute;y chủ m&aacute;y t&iacute;nh. Do đ&oacute;, Ch&uacute;ng t&ocirc;i kh&ocirc;ng cam kết sẽ đ&aacute;p ứng được y&ecirc;u cầu sử dụng Dịch vụ của tất cả Kh&aacute;ch h&agrave;ng v&agrave; được miễn trừ tr&aacute;ch nhiệm bồi thường cho c&aacute;c giới hạn về khả năng hoạt động dẫn đến sự sai s&oacute;t hoặc chậm trễ trong việc thực hiện Dịch vụ.</p>
<p>i. Để duy tr&igrave; v&agrave; n&acirc;ng cao ti&ecirc;u chuẩn dịch vụ hoặc phục vụ mục đ&iacute;ch x&aacute;c minh, đ&agrave;o tạo, giai đoạn đặt hẹn, c&aacute;c buổi tư vấn,li&ecirc;n hệ sau tư vấn&hellip; sẽ được Ch&uacute;ng t&ocirc;i ghi &acirc;m, ghi h&igrave;nh v&agrave;/hoặc sử dụng th&ocirc;ng tin, t&agrave;i liệu, h&igrave;nh ảnh,&hellip; m&agrave; Kh&aacute;ch h&agrave;ng đ&atilde; cung cấp cho Ch&uacute;ng t&ocirc;i, ph&ugrave; hợp quy định của ph&aacute;p luật. Ch&uacute;ng t&ocirc;i cam kết bảo mật th&ocirc;ng tin c&aacute; nh&acirc;n, th&ocirc;ng tin li&ecirc;n lạc, chẩn đo&aacute;n, điều trị,&hellip; của Kh&aacute;ch h&agrave;ng v&agrave; hạn chế tối đa việc truy cập tr&aacute;i ph&eacute;p trừ khi bị hacker tấn c&ocirc;ng hoặc lỗi hệ thống ph&aacute;t sinh kh&ocirc;ng phải do lỗi của Ch&uacute;ng t&ocirc;i. Tuy nhi&ecirc;n, Ch&uacute;ng t&ocirc;i kh&ocirc;ng c&oacute; bất kỳ tr&aacute;ch nhiệm ph&aacute;p l&yacute; n&agrave;o đối với việc kh&ocirc;ng tu&acirc;n thủ ch&iacute;nh s&aacute;ch bảo mật từ ph&iacute;a Kh&aacute;ch h&agrave;ng hoặc th&ocirc;ng tin của Kh&aacute;ch h&agrave;ng bị r&ograve; rỉ từ c&aacute;c hệ thống lưu trữ th&ocirc;ng tin kh&ocirc;ng phải của ch&uacute;ng t&ocirc;i hay do Ch&uacute;ng t&ocirc;i quản l&yacute;.</p>
<p>j. Điều dưỡng vi&ecirc;n, thư k&yacute; y khoa hoặc nh&acirc;n vi&ecirc;n kh&aacute;c của Ch&uacute;ng t&ocirc;i c&oacute; thể c&oacute; mặt trong qu&aacute; tr&igrave;nh cung cấp Dịch vụđể vận h&agrave;nh thiết bị ghi &acirc;m, ghi h&igrave;nh v&agrave; hỗ trợ Chuy&ecirc;n gia/b&aacute;c sỹ một số c&ocirc;ng việc kh&aacute;c nhưng sẽ thực hiện c&aacute;c quy tr&igrave;nh hợp l&yacute; để duy tr&igrave; t&iacute;nh bảo mật của th&ocirc;ng tin/h&igrave;nh ảnh thu được.</p>
<p>k. Ngo&agrave;i ra, Ch&uacute;ng t&ocirc;i kh&ocirc;ng chịu tr&aacute;ch nhiệm cho bất kỳ tổn thất n&agrave;o với bất kỳ c&aacute; nh&acirc;n, tổ chức n&agrave;o nếu:</p>
<ul>
    <li>i. Người chịu tổn thất kh&ocirc;ng phải l&agrave; Kh&aacute;ch h&agrave;ng của Ch&uacute;ng t&ocirc;i; hoặc</li>
    <li>ii. Kh&aacute;ch h&agrave;ng sử dụng hoặc kh&ocirc;ng sử dụng lời khuy&ecirc;n của Chuy&ecirc;n gia/B&aacute;c sỹ của Ch&uacute;ng t&ocirc;i; hoặc;</li>
    <li>iii. Kh&aacute;ch h&agrave;ng vi phạm bất kỳ quy định n&agrave;o tại Điều kiện v&agrave; Điều khoản n&agrave;y.</li>
</ul>
<p><strong><strong>4. Điều chỉnh, từ chối, chấm dứt v&agrave; tạm ngừng Dịch vụ:</strong></strong></p>
<p>a. Ch&uacute;ng t&ocirc;i sẽ cập nhật c&aacute;c nội dung của Điều kiện v&agrave; Điều khoản n&agrave;y v&agrave; ph&aacute;t h&agrave;nh bất kỳ hướng dẫn n&agrave;o li&ecirc;n quan đến việc sử dụng Dịch vụ theo từng thời điểm tr&ecirc;n website của Ch&uacute;ng t&ocirc;i, Kh&aacute;ch h&agrave;ng hiểu rằng việc sử dụng Dịch vụ của m&igrave;nh trước thời điểm điều chỉnh phải được chấm dứt nếu Kh&aacute;ch h&agrave;ng kh&ocirc;ng cam kết tu&acirc;n thủ theo c&aacute;c điều chỉnh v&agrave; hướng dẫn mới.</p>
<p>b. Ch&uacute;ng t&ocirc;i bảo lưu quyền từ chối, chấm dứt v&agrave; tạm ngưng Dịch vụ khi ch&uacute;ng t&ocirc;i nhận thấy việc đ&oacute; l&agrave; cần thiết hoặc đảm bảo việc tu&acirc;n thủ theo c&aacute;c quy định của ph&aacute;p luật, hướng dẫn của Ch&iacute;nh phủ, Bộ Y tế hay c&aacute;c cơ quan quản l&yacute; nh&agrave; nước kh&aacute;c.</p>
<p><strong><strong>5. Khiến nại/khiếu kiện</strong></strong></p>
<p>C&aacute;c nội dung tại Điều kiện v&agrave; Điều khoản sử dụng n&agrave;y được điều chỉnh v&agrave; diễn giải theo luật ph&aacute;p Việt Nam. Mọi tranh chấp ph&aacute;t sinh li&ecirc;n quan tới Điều kiện v&agrave; Điều khoản n&agrave;y hoặc bất kỳ tranh chấp ph&aacute;t sinh li&ecirc;n quan tới Dịch vụ, đều c&oacute; thể đệ tr&igrave;nh l&ecirc;n c&aacute;c t&ograve;a &aacute;n c&oacute; thẩm quyền của Việt Nam để giải quyết.</p>
<p>Kh&aacute;ch h&agrave;ng đ&atilde; đọc kỹ v&agrave; chấp nhận c&aacute;c Điều kiện v&agrave; Điều khoản n&ecirc;u tr&ecirc;n trước khi gửi y&ecirc;u cầu cung cấp dịch vụ cho Ch&uacute;ng t&ocirc;i./.</p>
`;
