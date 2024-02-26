const listAdmins = () => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "/admins",
        method: "GET",
        dataType: "json",
        success: function (response_data) {
          resolve(response_data);
        },
      });
    });
  };
  
  const viewAdmin = (id) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/admins/${id}`,
        method: "GET",
        dataType: "json",
        success: function (response_data) {
          resolve(response_data);
        },
      });
    });
  };
  
  const deleteAdmin = (id) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/admins/${id}`,
        method: "DELETE",
        dataType: "json",
        success: function (response_data) {
          resolve(response_data);
        },
      });
    });
  };
  
  const loadTable = async () => {
    const admins = await listAdmins();
    const adminTable = document.getElementById("tableID");
    const tableBody = document.getElementById("tbodyID");
  
    let lastRow = tableBody.lastElementChild;
    const firstTableChild = tableBody.firstElementChild;
  
    if (lastRow !== null) {
      while (lastRow !== firstTableChild) {
        tableBody.removeChild(lastRow);
        lastRow = tableBody.lastElementChild;
      }
    }
  
    for (const admin of admins.allAdmins) {
      let tableRow;
      await viewAdmin(admin.admin_id).then((result) => {
        const {
          admin_id: adminId,
          full_name: fullName,
          admin_assistance: adminAssistance,
          age: age,
          date_of_visit: dateOfVisit,
          time_of_visit: timeOfVisit,
          comments: comments,
        } = result.admin[0];
  
        tableRow = populateRow(
          adminId,
          fullName,
          adminAssistance,
          age,
          dateOfVisit,
          timeOfVisit,
          comments
        );
      });
  
      tableBody.appendChild(tableRow);
    }
    adminTable.appendChild(tableBody);
    document.body.appendChild(adminTable);
  };
  
  const populateRow = (...args) => {
    const tableRow = document.createElement("tr");
    let cell;
    let cellText;
  
    const cellValue = [...args];
    cellValue.forEach((element) => {
      cell = document.createElement("td");
      cellText = document.createTextNode(element);
      cell.appendChild(cellText);
      tableRow.appendChild(cell);
    });
  
    cell = document.createElement("td");
    deleteSection = document.createElement("section");
    deleteSection.setAttribute("class", "delete-button-section");
  
    deleteButton = document.createElement("button");
    const adminId = args[0];
    deleteButton.setAttribute("class", "delete-button");
    deleteButton.setAttribute("value", adminId);
    deleteButton.textContent = "Delete";
    deleteButton.onclick = async (event) => {
      const clickedButton = event.target;
      const adminId = parseInt(clickedButton.value);
      handleDelete(confirmDelete(adminId), adminId);
    };
    deleteSection.appendChild(deleteButton);
    cell.appendChild(deleteSection);
    tableRow.appendChild(cell);
  
    return tableRow;
  };
  
  const loadExistingAdminsTable = () => {
    $(document).ready(function () {
      loadTable();
    });
  };
  loadExistingAdminsTable();
  
  const confirmDelete = (adminId) => {
    return window.confirm(
      `Your are about to delete this admin: ID = ${adminId}?`
    );
  };
  
  const handleDelete = async (deleteAdmin, adminId) => {
    if (deleteAdmin) {
      await deleteAdmin(adminId);
      await loadTable();
    }
  };
  
  const addAdminButton = document.getElementById("add-a-admin-button");
  addAdminButton.onclick = () => {
    showAdminContainer();
  };
  
  
  document.getElementById("admin-cancel-button").onclick = () => {
  };
  