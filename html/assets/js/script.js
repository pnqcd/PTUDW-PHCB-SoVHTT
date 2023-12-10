// document
//   .querySelector("#editUserModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#firstNameEdit").focus();
//   });

// document
//   .querySelector("#addUserModal")
//   .addEventListener("shown.bs.modal", () => {
//     document.querySelector("#firstName").focus();
//   });

document
  .querySelector("#editWardModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#wardNameEdit").focus();
  });

document
  .querySelector("#addWardModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#wardName").focus();
  });

  document
  .querySelector("#addPlaceModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#diaChi").focus();
  });

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

function showEditWardModal(btn) {
  document.querySelector("#id").value = btn.dataset.id;
  document.querySelector("#wardNameEdit").value = btn.dataset.wardName;
  document.querySelector("#districtNameEdit").value = btn.dataset.districtName;
  document.querySelector("#zipCodeEdit").value = btn.dataset.zipCode;
  document.querySelector("#populationEdit").value = btn.dataset.population;
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

function openCustomDown(elm) {
  if (elm.parentElement.querySelector('.customDown').style.display === "none")
      elm.parentElement.querySelector('.customDown').style.display = "block";
  else
      elm.parentElement.querySelector('.customDown').style.display = "none";
}

function openViewDetail(elm, wardName, districtName, zipCode, population) {
  let div = document.createElement('div');
  div.classList.add('modal-backdrop', 'fade', 'show');
  document.body.appendChild(div);

  let ancElm = elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal');
  ancElm.classList.add('show');
  elm.parentElement.parentElement.parentElement.parentElement.querySelector('.modal.detail-ward').style.display = "block";

  ancElm.querySelector('.detail-card :nth-child(1) span').textContent = wardName + ", " + districtName;
  ancElm.querySelector('.detail-card :nth-child(3) .span-content').textContent = zipCode;
  ancElm.querySelector('.detail-card :nth-child(4) .span-content').textContent = population;
}

function closeViewDetail(elm) {
  elm.closest('.modal.detail-ward').classList.remove('show');
  elm.closest('.modal.detail-ward').style.display = "none";
  document.querySelector('.modal-backdrop.fade.show').remove();
}
