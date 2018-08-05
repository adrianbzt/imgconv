var lastfile;

$('#add-files').on('click', function () {

    document.getElementById('myFileInput').click();

    $('#myFileInput').change(function (e) {

        e.stopImmediatePropagation();

         lastfile = $('#myFileInput').last();

        let files = lastfile[0].files;

        $.each(files, function (key, value) {
            let toDisplayFields = TableContent.prototype.extractFields(value);

            let htmlRow = TableContent.prototype.getTableRow(toDisplayFields);

            $('#table-content tbody').append(htmlRow);
        })
    });
})

$('#cancel-upload').on('click', function () {
    $('#table-content tbody tr').remove();
})

$('#start-upload-multiple').on('click', function() {

    console.log(lastfile)

    let PromiseMeYouWillRequestForData = $.ajax({
        url: "/convert/image",
        data: {
            'files': lastfile
        },
        method: 'POST',
        dataType: 'JSON',
        contentType: false,
        cache: false,
        processData:false,
    });

    PromiseMeYouWillRequestForData.done(response => {

        console.log(response)

    });

    PromiseMeYouWillRequestForData.always(data => {

        console.log(data)
    });

})

$(document).on('click', '.cancel-single-file', function() {
    $(this).closest ('tr').remove ();
})


$(document).on('click', '.convert-single-file', function() {

console.log('convert me')

})

function TableContent() {

}

TableContent.prototype.extractFields = function (rawData) {

    let fields = {};

    fields.fileName = rawData.name.split('.')[0];
    fields.fileExtension = rawData.name.split('.')[1];
    fields.fileSize = rawData.size;
    fields.filePath = rawData.value;

    return fields;

}

TableContent.prototype.getTableRow = function (rowData) {

    let row = `
       <tr>
        <th> 
            <img scope="row"  style="width: 80px; height: 80px" src="https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded_nologo400/157488/157488-1518801111947-88e04d00a35c4.jpg" /img>
         </th>
        <td>` + rowData.fileName + `</td>
        <td>` + rowData.fileExtension + `</td>
        <td>` + rowData.fileSize + `</td>
        <td>
            <button class="btn btn-warning cancel cancel-single-file"><span>Cancel</span></button>
            <button class="btn btn-primary convert-single-file"><span>Convert to JPG</span></button>
        </td>
        <td>
            <div class="progress">
                <div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 25%"
                     aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </td>
        <td>
            <button class="btn btn-success"><span>Download JPG</span></button>
        </td>        
    </tr>
    `;

    return row;
}