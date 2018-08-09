<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class FileUploader
{
    private $targetDirectory;

    public function upload(UploadedFile $file, $targetDirectory)
    {

        $this->targetDirectory = $targetDirectory;

        $fileName = md5(uniqid()) . '.' . $file->guessExtension();

        $file->move($this->getTargetDirectory(), $fileName);

        return $fileName;
    }

    public function getTargetDirectory($targetDirectory)
    {

        $this->targetDirectory = $targetDirectory;

        return $this->targetDirectory;
    }
}