(() => {
    class App {
        constructor(node) {
            this.node = document.querySelector(node);
            this.tableBody = this.node.querySelector('[data-js="table-body"]');
            this.config = [];
            this.btnSubmit = this.node.querySelector('[data-js="btn-submit"]');
            this.inputDomain = this.node.querySelector(
                '[data-js="input-domain"]'
            );
            this.inputColor = this.node.querySelector(
                '[data-js="input-color"]'
            );
            this.validationMsg = this.node.querySelector(
                '[data-js="validation-msg"]'
            );
            this.previewColor = this.node.querySelector(
                '[data-js="preview-color"]'
            );
        }
        onInputColorChange(event) {
            let value = event.currentTarget.value;
            let style = this.getPreviewStyle(value);

            this.previewColor.setAttribute('style', style);
        }
        deleteEntry(event) {
            let row = event.currentTarget.closest('tr');
            let rowIndex = row.rowIndex - 1;

            this.config.splice(rowIndex, 1);

            this.tableBody.deleteRow(rowIndex);

            chrome.storage.sync.set(
                {
                    config: this.config,
                },
                null
            );
        }
        validateEntry(inputs) {
            return [
                /^[a-z0-9.]+$/i.test(inputs.domain),
                /^#[a-z0-9]{6}$/i.test(inputs.color),
            ].every((truthy) => truthy);
        }
        addEntry() {
            let newEntry = {
                domain: this.inputDomain.value,
                color: this.inputColor.value,
            };

            let valid = this.validateEntry(newEntry);

            if (!valid) {
                this.validationMsg.setAttribute('style', '');

                return;
            }

            this.validationMsg.setAttribute('style', 'display: none;');

            this.config.push(newEntry);

            this.insertTableRow(newEntry);

            chrome.storage.sync.set(
                {
                    config: this.config,
                },
                () => {
                    this.inputDomain.value = '';
                    this.inputColor.value = '';
                }
            );
        }
        getPreviewStyle(color) {
            let styleProperties = {
                'background-color': color,
                display: 'inline-block',
                height: '1em',
                'font-size': '25px',
                width: '1em',
            };

            return Object.entries(styleProperties)
                .map(([key, value]) => {
                    return `${key}: ${value}`;
                })
                .join('; ');
        }
        getColumns(entry) {
            let previewStyle = this.getPreviewStyle(entry.color);

            return `
                <td>${entry.domain}</td>
                <td>${entry.color}</td>
                <td style="${previewStyle}"></td>
                <td>
                    <button type="button" data-js="btn-delete">
                        Delete Entry
                    </button>
                </td>
            `;
        }
        insertTableRow(entry) {
            let row = this.tableBody.insertRow(-1);

            row.innerHTML = this.getColumns(entry);

            row.querySelector('[data-js="btn-delete"]').addEventListener(
                'click',
                this.deleteEntry.bind(this)
            );
        }
        renderTable() {
            this.config.forEach((entry) => {
                this.insertTableRow(entry);
            });
        }
        onStorageSync(storage) {
            this.config = storage.config;
        }
        setEventBindings() {
            this.btnSubmit.addEventListener('click', this.addEntry.bind(this));
            this.inputColor.addEventListener(
                'input',
                this.onInputColorChange.bind(this)
            );
        }
        onSetupComplete() {
            this.renderTable();
            this.setEventBindings();
        }
        setup(cb) {
            chrome.storage.sync.get(['config'], (storage) => {
                this.onStorageSync(storage);

                cb();
            });
        }
        init() {
            this.setup(this.onSetupComplete.bind(this));
        }
    }

    let app = new App('[data-js="app"]');

    app.init();
})();
