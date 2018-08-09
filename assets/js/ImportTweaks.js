$(document).on('click', '#add-files', function () {

    document.getElementById('myFileInput').click();

    $(document).off('change', '#myFileInput').on('change', '#myFileInput', function (e) {

        let fileInput = $('#myFileInput')[0].files;
        buildFormData(e, fileInput);

        let filesToSend = [];
        let counter = 0;


        $('#start-download-multiple').prop('disabled', false);
        $('#start-download-multiple').toggleClass('btn-success');
        $('#start-upload-multiple').prop('disabled', true);
        $('#cancel-upload').prop('disabled', true);

    });
})

$('#start-upload-multiple').on('click', function () {

    //TODO: use real files
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


    $('#start-download-multiple').prop('disabled', false);
    $('#start-download-multiple').toggleClass('btn-success');
    $('#start-upload-multiple').prop('disabled', true);
    $('#cancel-upload').prop('disabled', true);

})

$(document).on('click', '.cancel-single-file', function () {
    $(this).closest('tr').remove();
    alert('Work in progress');
})

$('#cancel-upload').on('click', function () {
    TableContent.prototype.clearTableContent();
})

$(document).on('click', '#start-download-multiple', function () {
    alert('Work in progress');
})

$(document).on('click', '.single-download', function () {
    alert('Work in progress');
})

$(document).on('click', '.convert-single-file', function () {

    //TODO: implement it for single file
    console.log('TO DO: Convert a single file')
    alert('Work in progress');

})

function buildFormData(e, formInput) {


    let counter = 0;
    let data = new FormData();
    $.each(formInput, function (i, file) {

        let tmppath = processBuildDataPath(e, i)

        let toDisplayFields = TableContent.prototype.extractFields(file, tmppath);

        let isAllowed = checkIfFileExtensionIsAllowed(toDisplayFields.fileExtension);

        if (isAllowed) {
            let htmlRow = TableContent.prototype.getTableRow(toDisplayFields);

            $('#table-content tbody').append(htmlRow);

            if (counter < 3) {
                counter++;
                data.append('file-' + i, file);
            } else {
                TableContent.prototype.pushFieldsToServer(data);

                for (var pair of data.entries()) {
                    data.delete(pair[0]);
                }
                data.append('file-' + i, file);
                counter = 0;
            }
        }
    });

    if (counter > 0) {
        TableContent.prototype.pushFieldsToServer(data);

        for (var pair of data.entries()) {
            data.delete(pair[0]);
        }
        counter = 0;
    }

}

function processBuildDataPath(e, i) {
    return URL.createObjectURL(e.target.files[i]);
}


function checkIfFileExtensionIsAllowed(extension) {

    let allowedExtensions = ['png'];

    if (allowedExtensions.includes(extension)) {
        return true;
    } else {
        return false;
    }
}

function TableContent() {

}

TableContent.prototype.clearTableContent = function () {
    $('#table-content tbody tr').remove();
}

TableContent.prototype.pushFieldsToServer = function (filesToSend) {

    $.each(filesToSend, function (key, filename) {
        //TableContent.prototype.updateProgressBarInQueue(filename);
    })

    let PromiseMeYouWillRequestForData = $.ajax({
        url: "/convert/image",
        data: filesToSend,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
    });

    PromiseMeYouWillRequestForData.done(response => {

        // $.each(response, function (fileId, value) {
        //     //TableContent.prototype.updateProgressBar(fileId, value);
        //     //TableContent.prototype.updateDownloadButtonStatus(fileId, value);
        // })

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

TableContent.prototype.updateProgressBarInQueue = function (filename) {

    console.log(filename)

    let fileId = filename.split('.')[0];
    let progressBar = $("#" + fileId).find('div .progress-bar');

    let progresPercentage = 100;
    let progressStatus = 'bg-active';
    let progressMessage = 'Queued';

    progressBar.prop('aria-valuenow', progresPercentage);
    progressBar.css('width', progresPercentage + "%");
    progressBar.addClass(progressStatus);
    progressBar.text(progressMessage)
}

TableContent.prototype.updateDownloadButtonStatus = function (fileId, value) {

    let downloadButton = $("#" + fileId).find('.single-download');

    if (value.success === 1) {
        downloadButton.prop('disabled', false);
        downloadButton.addClass('btn-success');
    }
}

TableContent.prototype.extractFields = function (rawData, tmppath) {

    let fields = {};

    fields.fileName = rawData.name.split('.')[0];
    fields.fileExtension = rawData.name.split('.')[1];
    fields.fileSize = TableContent.prototype.formatBytes(rawData.size, 2);
    fields.filePath = tmppath;

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
            <img scope="row"  style="width: 80px; height: 80px" src="` + rowData.filePath + `" /img>
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
            <button class="btn single-download" disabled="disabled"><span>Download JPG</span></button>
        </td>        
    </tr>
    `;

    return row;
}