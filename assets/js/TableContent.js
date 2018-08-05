function TableContent() {

}

TableContent.prototype.getTableRow = function(rowData) {

    console.log(rowData)

    let row = `
       <tr>
        <th scope="row">1</th>
        <td>555</td>
        <td>JPG</td>
        <td>
            <button class="btn btn-warning cancel"><span>Cancel upload</span></button>
            <button class="btn btn-primary cancel"><span>Upload</span></button>
        </td>
        <td>
            <div class="progress">
                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 25%"
                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </td>
    </tr>
    `;

    return ' ana are mere mari'
}