<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Services\ImageConversion;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="default")
     * @return Response
     * @throws \Exception
     */
    public function number()
    {
        return $this->render('layout.html.twig', array());
    }

    /**
     * @Route("/convert/image")
     * @param Request $request
     * @return Response
     */

    public function convertImage(Request $request)
    {

        $files = $request->get('files');

        $imageConversion = new ImageConversion();
        $result = $imageConversion->convertImage($files);

        $response = new Response(
            json_encode($result, JSON_PRETTY_PRINT)
        );

        $response->headers->set('Content-Type', 'application/json');

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