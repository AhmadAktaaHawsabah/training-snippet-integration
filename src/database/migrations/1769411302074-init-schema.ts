import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1769411302074 implements MigrationInterface {
    name = 'InitSchema1769411302074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wallet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`balance\` decimal NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`REL_35472b1fe48b6330cd34970956\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_settings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`notificationPreference\` enum ('email', 'sms', 'all', 'none') NOT NULL, \`userId\` int NOT NULL, UNIQUE INDEX \`REL_2c45eb892f9027c250b9a4c281\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`role\` enum ('admin', 'user', 'system') NOT NULL DEFAULT 'user', \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_1e3d0240b49c40521aaeb95329\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`productId\` int NOT NULL, \`amount\` int NOT NULL, \`status\` enum ('pending', 'approved', 'rejected', 'completed') NOT NULL, \`notificationStatus\` enum ('sent', 'notSent', 'notContact') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`approvedAt\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`email_response\` (\`id\` int NOT NULL AUTO_INCREMENT, \`success\` tinyint NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`orderId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`email_error\` (\`id\` int NOT NULL AUTO_INCREMENT, \`statusCode\` int NOT NULL, \`errorType\` enum ('CLIENT', 'SERVER') NOT NULL, \`message\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`responseId\` int NULL, UNIQUE INDEX \`REL_d4ada8db7961c431c2655763b8\` (\`responseId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pricing\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price\` decimal NOT NULL, \`duration\` varchar(255) NOT NULL, \`service_id\` int NOT NULL, \`serviceId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`services\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`category_id\` int NOT NULL, \`typeId\` int NOT NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`wallet\` ADD CONSTRAINT \`FK_35472b1fe48b6330cd349709564\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_settings\` ADD CONSTRAINT \`FK_2c45eb892f9027c250b9a4c2811\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_88991860e839c6153a7ec878d39\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_response\` ADD CONSTRAINT \`FK_c0cb500f40d2921f997f3c0c322\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`email_error\` ADD CONSTRAINT \`FK_d4ada8db7961c431c2655763b83\` FOREIGN KEY (\`responseId\`) REFERENCES \`email_response\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pricing\` ADD CONSTRAINT \`FK_420e1792e18656a1d66a20bab0c\` FOREIGN KEY (\`serviceId\`) REFERENCES \`services\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`services\` ADD CONSTRAINT \`FK_034b52310c2d211bc979c3cc4e8\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`services\` ADD CONSTRAINT \`FK_7b4c9f63b9f73bf5fc65fbda327\` FOREIGN KEY (\`typeId\`) REFERENCES \`types\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`services\` DROP FOREIGN KEY \`FK_7b4c9f63b9f73bf5fc65fbda327\``);
        await queryRunner.query(`ALTER TABLE \`services\` DROP FOREIGN KEY \`FK_034b52310c2d211bc979c3cc4e8\``);
        await queryRunner.query(`ALTER TABLE \`pricing\` DROP FOREIGN KEY \`FK_420e1792e18656a1d66a20bab0c\``);
        await queryRunner.query(`ALTER TABLE \`email_error\` DROP FOREIGN KEY \`FK_d4ada8db7961c431c2655763b83\``);
        await queryRunner.query(`ALTER TABLE \`email_response\` DROP FOREIGN KEY \`FK_c0cb500f40d2921f997f3c0c322\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_88991860e839c6153a7ec878d39\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`users_settings\` DROP FOREIGN KEY \`FK_2c45eb892f9027c250b9a4c2811\``);
        await queryRunner.query(`ALTER TABLE \`wallet\` DROP FOREIGN KEY \`FK_35472b1fe48b6330cd349709564\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`services\``);
        await queryRunner.query(`DROP TABLE \`pricing\``);
        await queryRunner.query(`DROP TABLE \`types\``);
        await queryRunner.query(`DROP INDEX \`REL_d4ada8db7961c431c2655763b8\` ON \`email_error\``);
        await queryRunner.query(`DROP TABLE \`email_error\``);
        await queryRunner.query(`DROP TABLE \`email_response\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e3d0240b49c40521aaeb95329\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_2c45eb892f9027c250b9a4c281\` ON \`users_settings\``);
        await queryRunner.query(`DROP TABLE \`users_settings\``);
        await queryRunner.query(`DROP INDEX \`REL_35472b1fe48b6330cd34970956\` ON \`wallet\``);
        await queryRunner.query(`DROP TABLE \`wallet\``);
    }

}
