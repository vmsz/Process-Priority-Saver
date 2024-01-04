class File {
  constructor(process, priority) {
    this.process = process;
    this.priority = priority;
  }
  dataValidation() {
    if (this.process == ``) {
      document.getElementById(`warning`).innerHTML = `Process name is empty!`;
      return false;
    } else if (!this.process.endsWith(`.exe`)) {
      document.getElementById(
        `warning`
      ).innerHTML = `Process name must end with ".exe"!`;
      return false;
    } else if (this.priority == 0) {
      document.getElementById(`warning`).innerHTML = `No priority is selected!`;
      return false;
    } else {
      document.getElementById(`warning`).innerHTML = `Done!`;
      return true;
    }
  }
  generateFile() {
    if (this.dataValidation()) {
      const text = `Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${this.process}]
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${this.process}\\PerfOptions]
"CpuPriorityClass"=dword:0000000${this.priority}`;
      const file = new Blob([text], { type: `text/plain` });
      return saveAs(file, `${this.process} Priority.reg`);
    }
  }
}

const button = document.getElementById(`create-file`);
button.addEventListener(`click`, function () {
  const process = document.getElementById(`process`).value;
  const priority = document.getElementById(`priority`).value;
  new File(process, priority).generateFile();
});
