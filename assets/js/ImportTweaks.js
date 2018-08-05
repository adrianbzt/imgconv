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

$('#start-upload-multiple').on('click', function () {

    let filesToConvert = ['file1.png', 'file2.png', 'file3.jpg', 'file4.png', 'file5.png'];

    let filesToSend = [];
    let counter = 0;

    $.each(filesToConvert, function (key, value) {

        if (counter < 3) {
            counter++;
            filesToSend.push(value);
            console.log("Counter is: " + counter + "! Values will not be pushed!")
            console.log(filesToSend)
            console.log("=========================================")
        } else {
            console.log("Counter is: " + counter + "! Values will be pushed!")
            console.log(filesToSend)
            console.log("+++++++++++++++++++++++++++++++++++++++++")
            TableContent.prototype.pushFieldsToServer(filesToSend)
            filesToSend = [];
            filesToSend.push(value);
            counter = 0;
        }
    })

    if (filesToSend.length > 0) {
        TableContent.prototype.pushFieldsToServer(filesToSend);
        filesToSend = [];
        counter = 0;
    }


})

$(document).on('click', '.cancel-single-file', function () {
    $(this).closest('tr').remove();
})


$(document).on('click', '.convert-single-file', function () {

    //TODO: implement it for single file
    console.log('TO DO: Convert a single file')

})

function TableContent() {

}

TableContent.prototype.pushFieldsToServer = function (filesToSend) {
    let PromiseMeYouWillRequestForData = $.ajax({
        url: "/convert/image",
        data: {
            'files': filesToSend
        },
        method: 'POST',
        dataType: 'JSON'
    });

    PromiseMeYouWillRequestForData.done(response => {

        $.each(response, function (fileId, value) {


            TableContent.prototype.updateProgressBar(fileId, value);

            console.log(value)
        })

    });

}

TableContent.prototype.updateProgressBar = function (fileId, value) {
    let progressBar = $("#" + fileId).find('div .progress-bar');

    let progresPercentage;
    let progressStatus;
    let progressMessage;

    if (value.success === 1) {
        progresPercentage = 100;
        progressStatus = 'bg-success';

    } else {
        progresPercentage = 100;
        progressStatus = 'bg-warning';
    }

    progressMessage = value.message;

    progressBar.prop('aria-valuenow', progresPercentage);
    progressBar.css('width', progresPercentage + "%");
    progressBar.addClass(progressStatus);
    progressBar.text(progressMessage)
}

TableContent.prototype.extractFields = function (rawData) {

    let fields = {};

    fields.fileName = rawData.name.split('.')[0];
    fields.fileExtension = rawData.name.split('.')[1];
    fields.fileSize =TableContent.prototype.formatBytes(rawData.size, 2);
    fields.filePath = rawData.value;

    return fields;

}

TableContent.prototype.formatBytes = function (a, b) {
    if (0 == a) return "0 Bytes";
    var c = 1024, d = b || 2, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f];

}

TableContent.prototype.getTableRow = function (rowData) {

    let row = `
       <tr id="` + rowData.fileName + `">
        <th> 
            <img scope="row"  style="width: 80px; height: 80px" src="https://s3-us-west-2.amazonaws.com/anchor-generated-image-bank/production/podcast_uploaded_nologo400/157488/157488-1518801111947-88e04d00a35c4.jpg" /img>
         </th>
        <td>` + rowData.fileName + `</td>
        <td>` + rowData.fileExtension + `</td>
        <td>` + rowData.fileSize + `</td>
        <td>
            <button class="btn btn-warning cancel cancel-single-file" disabled="disabled"><span>Cancel</span></button>
            <button class="btn btn-primary convert-single-file" disabled="disabled"><span>Convert to JPG</span></button>
        </td>
        <td>
            <div class="progress">
                <div class="progress-bar progress-bar-striped bg-default" role="progressbar" style="width: 0%"
                     aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </td>
        <td>
            <button class="btn btn-success" disabled="disabled"><span>Download JPG</span></button>
        </td>        
    </tr>
    `;

    return row;
}