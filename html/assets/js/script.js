let editWardEle = document.querySelector("#editWardModal");
if (editWardEle) {
  editWardEle.addEventListener("shown.bs.modal", () => {
    document.querySelector("#wardNameEdit").focus();
  });
}

let addWardEle = document.querySelector("#addWardModal");
if (addWardEle) {
  addWardEle.addEventListener("shown.bs.modal", () => {
    document.querySelector("#wardName").focus();
  });
}

let addPlaceEle = document.querySelector("#addPlaceModal")
if (addPlaceEle) {
  addPlaceEle.addEventListener("shown.bs.modal", () => {
    document.querySelector("#diaChi").focus();
  });
}

let editPlaceEle = document.querySelector("#editPlaceModal");
if (editPlaceEle) {
  editPlaceEle.addEventListener("shown.bs.modal", () => {
    document.querySelector("#diaChiEdit").focus();
  });
}

let addAdsEle = document.querySelector("#addAdsModal");
if (addAdsEle) {
  addAdsEle.addEventListener("shown.bs.modal", () => {
    document.querySelector("#adName").focus();
  });
}

let addAccountEle = document.querySelector("#addAccountModal");
if (addAccountEle) {
  addAccountEle.addEventListener("shown.bs.modal", () => {
    document.querySelector("#username").focus();
  });
}

document.querySelectorAll(".user-delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    const options = {
      title: "Bạn có chắc chắn muốn xoá?",
      type: "danger",
      btnOkText: "Xoá",
      btnCancelText: "Thoát",
      onConfirm: () => {
        console.log("Confirm");
        console.log(id);
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Bạn có chắc chắn muốn xoá?", options);
  });
});

document.querySelectorAll(".ward-delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    const options = {
      title: "Bạn có chắc chắn xoá phường này?",
      type: "danger",
      btnOkText: "Xoá",
      btnCancelText: "Thoát",
      onConfirm: () => {
        console.log("Confirm");
        console.log(id);
        deleteWard(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Bạn có chắc chắn xoá phường này?", options);
  });
});

document.querySelectorAll(".place-delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    const options = {
      title: "Bạn có chắc chắn muốn xoá?",
      type: "danger",
      btnOkText: "Xoá",
      btnCancelText: "Thoát",
      onConfirm: () => {
        console.log("Confirm");
        console.log(id);
        deletePlace(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Bạn có chắc chắn muốn xoá?", options);
  });
});

document.querySelectorAll(".account-delete-btn").forEach((btnConfirm) => {
  btnConfirm.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    const options = {
      title: "Bạn có chắc chắn muốn xoá?",
      type: "danger",
      btnOkText: "Xoá",
      btnCancelText: "Thoát",
      onConfirm: () => {
        console.log("Confirm");
        console.log(id);
        deleteAccount(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Bạn có chắc chắn muốn xoá?", options);
  });
});

function showEditWardModal(btn) {
  document.querySelector("#idWard").value = btn.dataset.id;
  document.querySelector("#wardNameEdit").value = btn.dataset.wardName;
  document.querySelector("#districtNameEdit").value = btn.dataset.districtName;
  document.querySelector("#zipCodeEdit").value = btn.dataset.zipCode;
  document.querySelector("#populationEdit").value = btn.dataset.population;
}

function showEditPlaceModal(btn) {
  document.querySelector("#idPlace").value = btn.dataset.id;
  document.querySelector("#diaChiEdit").value = btn.dataset.diaChi;
  document.querySelector("#khuVucEdit").value = btn.dataset.khuVuc;
  document.querySelector("#loaiVTEdit").value = btn.dataset.loaiVt;
  document.querySelector("#hinhThucEdit").value = btn.dataset.hinhThuc;
  document.querySelector("#quyHoachEdit").checked = btn.dataset.quyHoach == "ĐÃ QUY HOẠCH" ? true : false;
}

function showEditUserModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#usernameEdit").value = btn.dataset.username;
  document.querySelector("#firstNameEdit").value = btn.dataset.firstName;
  document.querySelector("#lastNameEdit").value = btn.dataset.lastName;
  document.querySelector("#mobileEdit").value = btn.dataset.mobile;
  document.querySelector("#isAdminEdit").checked = btn.dataset.isAdmin == "true" ? true : false;
}

async function editWard(e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById("editWardForm"));
  const data = Object.fromEntries(formData.entries());

  // data = {
  //   wardName: document.querySelector('#wardNameEdit').value,
  // }

  let res = await fetch('/danh-sach/wards', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  location.reload();
}

async function editPlace(e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById("editPlaceForm"));
  const data = Object.fromEntries(formData.entries());

  // data = {
  //   wardName: document.querySelector('#wardNameEdit').value,
  // }

  let res = await fetch('/danh-sach/places', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  location.reload();
}

async function editUser(e) {
  e.preventDefault();

  const formData = new FormData(document.getElementById("editUserForm"));
  const data = Object.fromEntries(formData.entries());

  // data = {
  //   firstName: document.querySelector('#firstNameEdit').value,
  // }

  let res = await fetch('/users', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  location.reload();
}

async function deleteUser(id) {
  let res = await fetch(`/users/${id}`, {
    method: "DELETE",
  });

  location.reload();
}

async function deleteWard(id) {
  let res = await fetch(`/danh-sach/wards/${id}`, {
    method: "DELETE",
  });

  location.reload();
}

async function deletePlace(id) {
  let res = await fetch(`/danh-sach/places/${id}`, {
    method: "DELETE",
  });

  location.reload();
}

async function deleteAccount(id) {
  let res = await fetch(`/tai-khoan/${id}`, {
    method: "DELETE",
  });

  location.reload();
}

function openCustomDown(elm) {
  if (elm.parentElement.querySelector('.customDown').style.display === "none")
      elm.parentElement.querySelector('.customDown').style.display = "block";
  else
      elm.parentElement.querySelector('.customDown').style.display = "none";
}

function openViewWardDetail(elm, wardName, districtName, zipCode, population, imagePath) {
  let div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(div);

  let ancElm = elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal');
  ancElm.classList.add('show');
  elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal.detail-ward').style.display = "block";

  ancElm.querySelector('.detail-card :nth-child(1) span').textContent = wardName + ", " + districtName;
  ancElm.querySelector('.detail-card :nth-child(3) .span-content').textContent = zipCode;
  ancElm.querySelector('.detail-card :nth-child(4) .span-content').textContent = population;

  if (imagePath) ancElm.querySelector('img').src = imagePath;
}

function closeViewWardDetail(elm) {
  elm.closest('.modal.detail-ward').classList.remove('show');
  elm.closest('.modal.detail-ward').style.display = "none";
  document.querySelector('.modal-backdrop.fade.show').remove();
}

function openViewPlaceDetail(elm, diaChi, khuVuc, loaiVT, hinhThuc, quyHoach, hinhAnh) {
  let div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(div);

  let ancElm = elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal');
  ancElm.classList.add('show');
  elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal.detail-place').style.display = "block";

  ancElm.querySelector('.detail-card :nth-child(1) span').textContent = diaChi + ", " + khuVuc;
  ancElm.querySelector('.detail-card :nth-child(3) .span-content').textContent = loaiVT;
  ancElm.querySelector('.detail-card :nth-child(4) .span-content').textContent = hinhThuc;
  ancElm.querySelector('.detail-card :nth-child(5) span').textContent = quyHoach;

  if (hinhAnh) ancElm.querySelector('img').src = hinhAnh;
}

function closeViewPlaceDetail(elm) {
  elm.closest('.modal.detail-place').classList.remove('show');
  elm.closest('.modal.detail-place').style.display = "none";
  document.querySelector('.modal-backdrop.fade.show').remove();
}

function disableWardInput() {
  let chucVuEle = document.querySelector("#chucVu");
  let wardUnitEle = document.querySelector("#wardUnit");

  if (chucVuEle.value === "Cán bộ quận")
    wardUnitEle.disabled = true;
  else wardUnitEle.disabled = false;
}

// Check username existed 
function checkUsernameExisted(event) {
  event.preventDefault();

  let usernameElm = document.querySelector("#username");
  let username = usernameElm.value;

  fetch('/tai-khoan/checkUsernameWhenAddAccount?username=' + encodeURIComponent(username))
    .then(response => response.json())
    .then(data => {
      if (data.exists) {
        usernameElm.setCustomValidity('Tên đăng nhập đã tồn tại');
      } else {
        usernameElm.setCustomValidity('');
      }
    })
    .catch(error => console.error(error));
}