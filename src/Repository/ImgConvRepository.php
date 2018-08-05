<?php

namespace App\Repository;

use App\Entity\ImgConv;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ImgConv|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImgConv|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImgConv[]    findAll()
 * @method ImgConv[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImgConvRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ImgConv::class);
    }

//    /**
//     * @return ImgConv[] Returns an array of ImgConv objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    public function findOneBySomeField($value): ?ImgConv
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.id = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
}
