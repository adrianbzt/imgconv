<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\ImageConversion;
use App\Service\FileUploader;


class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="default")
     * @return Response
     * @throws \Exception
     */
    public function defaultAction()
    {
        return $this->render('layout.html.twig', array());
    }

    /**
     * @Route("/convertImage")
     * @return Response
     */

    public function convertImage()
    {

        $imageConversion = new ImageConversion();
        $result = $imageConversion->convertImage($_FILES);

        $response = new Response(
            json_encode($result, JSON_PRETTY_PRINT)
        );

        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

    /**
     * @Route("/downloadImage")
     * @param Request $request;
     * @return ResponseHeaderBag
     */

    public function downloadImage(Request $request)
    {

        $filePath = '../public/download/images/jpg/file1.jpg';
        $response = new Response($filePath);

        $disposition = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            'file1.jpg'
        );

        $response->headers->set('Cache-Control', 'private');
        $response->headers->set('Content-Disposition', $disposition);
        $response->headers->set('Content-Type', 'image/jpg');

        $response->sendHeaders();

        $response->setContent(file_get_contents($filePath));

        return $response;
    }

    /**
     * TODO: the progress should be saved in DB and resumed in case of an interruption
     * @Route("/uploadImages")
     * @param Request $request
     * @return Response
     */
    public function insertImages(Request $request)
    {

        $entityManger = $this->getDoctrine()->getManager();
        $repository = $entityManger->getRepository('App:ImgConv');

        $aResponse = $repository->insertValues();

        $response = new Response(
            json_encode($aResponse, JSON_PRETTY_PRINT)
        );

        $response->headers->set('Content-Type', 'application/json');

        return $response;

    }
}