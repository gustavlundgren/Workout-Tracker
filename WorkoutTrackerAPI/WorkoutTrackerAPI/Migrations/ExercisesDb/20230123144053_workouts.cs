﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WorkoutTrackerAPI.Migrations.ExercisesDb
{
    /// <inheritdoc />
    public partial class workouts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WorkoutModelId",
                table: "Exercises",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Workouts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workouts", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_WorkoutModelId",
                table: "Exercises",
                column: "WorkoutModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Workouts_WorkoutModelId",
                table: "Exercises",
                column: "WorkoutModelId",
                principalTable: "Workouts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Workouts_WorkoutModelId",
                table: "Exercises");

            migrationBuilder.DropTable(
                name: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_WorkoutModelId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "WorkoutModelId",
                table: "Exercises");
        }
    }
}
