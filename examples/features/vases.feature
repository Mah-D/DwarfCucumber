@libraries=common

@TestRailReporter=addResult(13068)
Feature: Vases

Scenario: A vase falls from the wall

    Given 100 green vases are standing on the wall
    When 1 green vase accidentally falls
    Then there are 99 green vases standing on the wall

@TestRailReporter=addResultForCase(37,71)
@JiraReporter=id:OO-1234
Scenario: No vases are left

    Given 1 green vases are standing on the wall
    when 1 green vase accidentally falls
    then there are 0 green vases standing on the wall

@Pending
Scenario: Vases are reset

    Given there are no green vases
    when 5 minutes has elapsed
    then there are 100 green vases standing on the wall

Scenario: [N] vases are standing on a wall

    Given [N] green vases are standing on the wall
    when 1 green vase accidentally falls
    then there are [N-1] green vases standing on the wall

    Where:
        N   | N-1
        100 | 99
        99  | 98
        10  | 9